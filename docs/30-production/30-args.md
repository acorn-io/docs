---
title: Acorn Image Arguments
---

By design authors will build Acorn Images with defaults for the common use-case, but every deployment has some organization- or environment-specific configurations. Acorn allows consumers to customize behavior at runtime.

To learn which arguments are available for the Acorn image you can run:

```shell
acorn run [IMAGE] --help
```

## Individual args on the command line

### Passing simple arguments

To pass simple arguments, you pass the value after the argument name.

```shell
acorn run [IMAGE] --a-string "oneday" --int-arg 4 --bool-defaults-true --negate-a-true-bool=false
```

### Passing complex arguments

To pass complex arguments, create a file in the local directory and pass it to Acorn with the `@` syntax:

```yaml title="config.yaml"
my:
  map:
    config: value
```

`acorn run registry.example.com/myorg/image --config @config.yaml`

This is assuming that the Acorn defines a `config` arg where the contents should end up in.

## Passing args via file

You can pass a file to Acorn with the `--args-file` flag. This is useful for passing in a large number of arguments or specific settings outside of the Acornfile.

The format of the file is valid AML in: `key: "value"` format.

Take this args section of an Acornfile for a Minecraft server for example:

```acorn
...
args: {
 // This must be TRUE to accept the EULA
 eula: true
 // Mode: "creative or survival" default "survival"
 mode: enum("creative", "survival") || default "survival"
 // Difficulty level of the game. Options are "peaceful", "easy", "normal", "hard"
 difficulty: enum("peaceful", "easy", "normal", "hard") || default "easy"
 // Allow characters to fly
 allowFlight: true
 // Enable GeyserMC. Allows Bedrock clients to connect to the server.
 geyser: true
 // Version of Minecraft paper to download
 version: "1.20.2"
}
...
```

You could create an args file: `creative-minecraft-args.acorn` with the following contents:

```acorn
eula: true
mode: "creative"
difficulty: "peaceful"
allowFlight: false
geyser: true
version: "1.20.2"
```

Now when you can pass all of these args to the Acorn with the following command:

```shell
acorn run --args-file ./creative-minecraft-args.acorn ghcr.io/cloudnautique/acorn-minecraft:latest-#
```
