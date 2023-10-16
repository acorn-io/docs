---
title: CLI Installation and Upgrade
---

## Acorn CLI

### Homebrew (macOS & Linux)

The preferred method for installing on Mac and Linux is to use the brew package manager.

You can install the latest Acorn CLI with the following:

```shell
brew install acorn-io/cli/acorn
```

You can also follow the binary installation below.

### curl|sh install (macOS & Linux)

If you don't have homebrew, you can install the CLI with this one-liner:

```shell
curl https://get.acorn.io | sh
```

### Scoop (Windows)

You can install the latest Acorn CLI with the following:

```shell
scoop install acorn
```

### Manual install

You can download the Acorn CLI binary from the project's [GitHub page](https://github.com/acorn-io/runtime/releases).

Download the correct binary for your platform.

#### macOS

Download either the universal DMG or the tar.gz file.

For the DMG run through the installer.

For the tar.gz download:

```shell
tar -zxvf ~/Downloads/acorn-v<version>-macos-universal.tar.gz
cp ~/Downloads/acorn /usr/local/bin/acorn
```

 *Note: if using zsh you will need to make sure ulimit -f can handle files > 140MB*

#### Linux

Download the tar.gz archive for your architecture. Uncompress and move the binary to your PATH.

```shell
 tar -zxvf ~/Downloads/acorn-v<version>-linux-<arch>.tar.gz
 mv ~/Downloads/acorn /usr/local/bin
```

#### Windows

Uncompress and move the binary to your PATH.

#### Development Binaries (main build)

The last successful build from the HEAD of the main branch is available for
[macOS](https://cdn.acrn.io/cli/mac_darwin_all/acorn),
[Linux](https://cdn.acrn.io/cli/default_linux_amd64_v1/acorn), and
[Windows](https://cdn.acrn.io/cli/default_windows_amd64_v1/acorn.exe)

### Shell completion

The Acorn CLI supports command autocompletion. If you installed acorn using homebrew, this is already configured for you. If you installed using the manual or curl|sh method, you must enable shell completion yourself.

To set autocompletion for the current terminal session, use the command that matches your shell:

```shell
source <(acorn completion bash)
source <(acorn completion zsh)
acorn completion fish | source
```

For permanent effect add the same line to your shell specific profile:

- ~/.bashrc
- ~/.zshrc
- ~/.config/fish/config.fish

## Upgrading CLI

In order to upgrade Acorn on a Kubernetes cluster you must first download an updated Acorn CLI version.

### Brew

```shell
brew update
brew upgrade acorn-io/cli/acorn
```

### Binary

Download the latest binary version and install following the binary install method.
