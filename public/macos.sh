#!/usr/bin/env bash
set -euo pipefail

# macOS bootstrap to install yadm, pull dotfiles, and common tools via Homebrew.
# Usage: curl -fsSL https://t-g.dev/public/macos.sh | bash

YADM_REPO="https://github.com/thomasgordon/dotfiles.git"

log() { printf "[%s] %s\n" "$(date +%H:%M:%S)" "$*"; }

install_homebrew() {
  if ! command -v brew >/dev/null 2>&1; then
    log "Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    eval "$(/opt/homebrew/bin/brew shellenv 2>/dev/null || /usr/local/bin/brew shellenv)"
  fi
}

install_brew_packages() {
  log "Installing Homebrew packages..."
  brew update || true
  brew install git zsh fzf jq neovim eza zoxide neofetch
  brew install --cask font-hack-nerd-font || true
}

install_yadm() {
  if ! command -v yadm >/dev/null 2>&1; then
    log "Installing yadm..."
    brew install yadm
    export PATH="$PATH:$HOME/.local/bin"
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
      curl -s https://ohmyposh.dev/install.sh | bash -s -- -y
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
  install_homebrew
  install_brew_packages
  install_yadm
    install_antidote
    install_oh_my_posh
  pull_dotfiles
  set_zsh_default
  log "macOS bootstrap complete."
}

main "$@"
