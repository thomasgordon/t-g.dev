#!/usr/bin/env bash
set -euo pipefail

# install.sh — autodetect platform and run the proper bootstrap script from t-g.dev
# Usage: curl -fsSL https://t-g.dev/install.sh | bash

log() { printf "[%s] %s\n" "$(date +%H:%M:%S)" "$*"; }

detect_script() {
  local os id id_like
  os="$(uname -s)"
  case "$os" in
    Darwin)
      echo "macos.sh"
      return
      ;;
    Linux)
      if [ -r /etc/os-release ]; then
        . /etc/os-release
        id="${ID:-}"
        id_like="${ID_LIKE:-}"
        if printf "%s" "$id $id_like" | grep -qi ubuntu; then
          echo "ubuntu.sh"
          return
        fi
        if printf "%s" "$id $id_like" | grep -qi debian; then
          echo "debian.sh"
          return
        fi
      fi
      # fallback to debian script for other linuxes
      echo "debian.sh"
      return
      ;;
    *)
      echo "";
      return 1
      ;;
  esac
}

main() {
  local script
  script="${1:-}"
  if [ -z "$script" ]; then
    script="$(detect_script)" || true
  fi

  if [ -z "$script" ]; then
    log "Unsupported platform; please run the matching script manually."
    exit 2
  fi

  local url
  url="https://t-g.dev/$script"
  log "Fetching and running $url"
  curl -fsSL "$url" | bash -s --
}

main "$@"
