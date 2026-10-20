#!/bin/bash
# Motomotos macOS installer — no Apple Developer ID / notarization required.
# Usage:  curl -fsSL http://motomotos.com/install.sh | bash
#    or:  curl -fsSL https://motomotos.com/install.sh | bash
set -euo pipefail
export PATH="/usr/bin:/bin:/usr/sbin:/sbin"

BASE_HTTP="http://motomotos.com"
BASE_HTTPS="https://motomotos.com"
TMP="$(mktemp -d /tmp/motomotos-install-XXXXXX)"
DMG="$TMP/Motomotos.dmg"
DEST="/Applications/Motomotos.app"
VOL=""

cleanup() {
  if [ -n "${VOL:-}" ] && [ -d "$VOL" ]; then
    hdiutil detach "$VOL" -force >/dev/null 2>&1 || true
  fi
  rm -rf "$TMP"
}
trap cleanup EXIT

fetch() {
  # $1=url $2=out
  curl -fsSL --connect-timeout 8 --max-time 180 -o "$2" "$1"
}

echo "========================================"
echo "  Motomotos Installer / 一键安装"
echo "========================================"
echo ""
echo "1) Downloading Motomotos.dmg ..."
echo "   正在下载安装包..."

# Prefer HTTP first: some macOS curl/SecureTransport clients reset TLS to this host
OK=0
if fetch "$BASE_HTTP/downloads/Motomotos.dmg" "$DMG"; then
  OK=1
elif fetch "$BASE_HTTPS/downloads/Motomotos.dmg" "$DMG"; then
  OK=1
fi
if [ "$OK" != 1 ]; then
  echo "Download failed. Open a browser and save the DMG, then run:"
  echo "  curl -fsSL http://motomotos.com/install.sh | bash"
  echo "Or manual:"
  echo "  open http://motomotos.com/downloads/Motomotos.dmg"
  exit 1
fi

SIZE=$(wc -c < "$DMG" | tr -d ' ')
if [ "$SIZE" -lt 1000000 ]; then
  echo "ERROR: download too small ($SIZE bytes) — not a valid DMG"
  exit 1
fi
echo "   downloaded ${SIZE} bytes"

echo "2) Mounting disk image ..."
echo "   正在挂载..."
ATTACH_OUT="$(hdiutil attach -nobrowse "$DMG")"
VOL="$(printf '%s\n' "$ATTACH_OUT" | awk '/\/Volumes\//{print; exit}' | sed 's/.*\(\/Volumes\/.*\)$/\1/')"
if [ -z "$VOL" ] || [ ! -d "$VOL/Motomotos.app" ]; then
  echo "ERROR: could not find Motomotos.app in DMG"
  echo "$ATTACH_OUT"
  exit 1
fi

echo "3) Installing to /Applications ..."
echo "   正在安装到「应用程序」..."
# Quit previous instance if any
pkill -f '/Applications/Motomotos.app/Contents/MacOS/motomotos' 2>/dev/null || true
rm -rf "$DEST"
ditto "$VOL/Motomotos.app" "$DEST"

echo "4) Clearing Gatekeeper quarantine flag ..."
echo "   正在清除隔离标记（无需 \$99 公证）..."
xattr -dr com.apple.quarantine "$DEST" 2>/dev/null || true

echo "5) Launching ..."
echo "   正在启动..."
open "$DEST" || true
sleep 2

if pgrep -f '/Applications/Motomotos.app/Contents/MacOS/motomotos' >/dev/null 2>&1; then
  echo ""
  echo "✅ Done — Motomotos is running from /Applications"
  echo "✅ 完成 — 已从「应用程序」启动"
  echo "   (Lives in the notch / menu area; no Dock icon.)"
  echo "   （在刘海/菜单栏区域；无 Dock 图标。）"
else
  echo ""
  echo "⚠️  Installed, but launch may need a one-time allow:"
  echo "⚠️  已安装；若仍拦截，请右键 Motomotos → 打开 → 打开"
  echo "   Or: System Settings → Privacy & Security → Open Anyway"
  echo "   xattr -dr com.apple.quarantine /Applications/Motomotos.app && open /Applications/Motomotos.app"
fi
echo ""
