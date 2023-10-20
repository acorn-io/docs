---
title: Dev Mode
---

To facilitate interactive development, Acorn provides a `dev` command that enables you to run your project in a mode that supports synching files and if configured live-reloading of the code. Meaning you can see changes in your application code without needing to rebuild containers, Acorns, and redeploying.

To start the interactive mode, you can use the `acorn dev` command.
The interactive dev mode offers a convenient way to test and debug your project as you develop it, as you can quickly see the effects of any changes you make. This mode can also help you to identify and fix errors more efficiently by providing real-time feedback on your code.

## Start a Session

- Start a dev session from the current working directory

  - ```bash
    acorn dev .
    ```

- Start a dev session from a pre-built image in the current working directory

  - ```bash
    acorn dev [IMAGE] .
    ```

When you are done developing you can press ctrl-c to let go of the session. This will stop the Acorn and terminate the log stream. You can start the app by running `acorn start [APP_NAME]`. This will allow you to share the endpoints while you are not actively developing.

To restart the session, you can use the `acorn dev` command again from the same directory. This will start the existing session and attach to the new containers. If the Acorn was removed, a new session will be created.

## Attaching to a Running Acorn

In some cases you might want to test something in the actual environment that is having trouble. Acorn allows you to attach to a running Acorn and start a dev session. The Acorn will be relaunched with the `args.dev` true and you can make changes as needed. When the dev session is ended, the Acorn reverts back to the previous state before the dev session.

- Attach a dev session to a pre-existing acorn in the current working directory

  - ```bash
    acorn dev -n [APP_NAME] 
    ```

- Attach a dev session and clone the source code

  - ```bash
    acorn dev -n [APP_NAME] --cloun [acorn args]
    ```

:::note
When using `acorn dev`, the `dev` profile will be automatically used. This behavior is the same when using `acorn run -i`.
:::
