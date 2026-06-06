#!/usr/bin/env bash
set -euo pipefail

# Ubuntu-specific bootstrap to install yadm, pull dotfiles, and common tools.
# Usage (example):
#   curl -fsSL https://t-g.dev/public/ubuntu.sh | bash -s -- https://github.com/thomasgordon/dotfiles.git
# Or set environment variable: YADM_REPO=https://github.com/thomasgordon/dotfiles.git bash ubuntu.sh

YADM_REPO="https://github.com/thomasgordon/dotfiles.git"

log() { printf "[%s] %s\n" "$(date +%H:%M:%S)" "$*"; }

install_apt_packages() {
  log "Updating apt and installing base packages..."
  sudo apt-get update -y
  sudo apt-get install -y --no-install-recommends \
    ca-certificates curl git wget gnupg lsb-release unzip zsh fzf jq neofetch build-essential

  # neovim from apt as fallback
  sudo apt-get install -y neovim || true
}

install_eza() {
  if ! command -v eza >/dev/null 2>&1; then
    log "Installing eza (ls replacement)..."
    sudo mkdir -p /etc/apt/keyrings
    curl -fsSL https://raw.githubusercontent.com/eza-community/eza/main/deb.asc | sudo gpg --dearmor -o /etc/apt/keyrings/gierens.gpg
    echo "deb [signed-by=/etc/apt/keyrings/gierens.gpg] http://deb.gierens.de stable main" | sudo tee /etc/apt/sources.list.d/gierens.list >/dev/null
    sudo chmod 644 /etc/apt/keyrings/gierens.gpg /etc/apt/sources.list.d/gierens.list
    sudo apt-get update -y
    sudo apt-get install -y eza || true
  fi
}

install_yadm() {
  if ! command -v yadm >/dev/null 2>&1; then
    log "Installing yadm..."
    sudo apt-get update -y
    sudo apt-get install -y yadm
    export PATH="$PATH:$HOME/.local/bin"
  fi
}

pull_dotfiles() {
  log "Pulling dotfiles with yadm from $YADM_REPO"
  if [ ! -d "$HOME/.yadm" ] && ! yadm status >/dev/null 2>&1; then
    yadm clone "$YADM_REPO" || yadm clone --bootstrap "$YADM_REPO"
  else
    yadm pull --force || true
  fi
}

install_antidote() {
  if [ ! -d "${ZDOTDIR:-$HOME}/.antidote" ]; then
    log "Installing Antidote zsh framework..."
    git clone --depth=1 https://github.com/mattmc3/antidote.git "${ZDOTDIR:-$HOME}/.antidote"
  fi
}

install_oh_my_posh() {
  if ! command -v oh-my-posh >/dev/null 2>&1; then
    log "Installing oh-my-posh..."
    curl -s https://ohmyposh.dev/install.sh | bash -s
  fi
}

install_zoxide() {
  if ! command -v zoxide >/dev/null 2>&1; then
    log "Installing zoxide..."
    curl -sSfL https://raw.githubusercontent.com/ajeetdsouza/zoxide/main/install.sh | sh
  fi
}

set_zsh_default() {
  local zsh_path
  zsh_path="$(command -v zsh || true)"
  if [ -n "$zsh_path" ] && [ "$SHELL" != "$zsh_path" ]; then
    log "Setting zsh as default shell"
    if chsh -s "$zsh_path" "$USER" 2>/dev/null; then
      log "Default shell changed to zsh. You may need to log out/in."
    else
      log "chsh failed (you may need to run it manually): chsh -s $zsh_path $USER"
    fi
  fi
}

main() {
  install_apt_packages
  install_eza
  install_yadm
  pull_dotfiles
  install_antidote
  install_oh_my_posh
  install_zoxide
  set_zsh_default
  log "Ubuntu bootstrap complete. Restart your shell or log out/in if needed."
}

main "$@"
