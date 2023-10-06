---
title: Acorn Projects
---

Acorn applications and other resources can be grouped into projects. Projects provide a way to organize applications, collaborators, and regions.

Projects can be created, listed, removed, and "used". When you "use" a project, it becomes the context under which you are interacting with Acorn applications and related resources.

## Projects on the CLI

### List Projects

When you install acorn, you'll automatically have one project called `acorn`. It can be seen in the project list. If you do nothing else, this is the project you'll use by default.

```bash
$ acorn projects

NAME      DEFAULT   DESCRIPTION
acorn     *
```

### Create Project

The following command creates a new project.

```bash
acorn project create my-new-project
```

### Use Project

To begin using a project, you must specify it using the `use` sub-command.

```bash
acorn project use my-new-project
```

Once you start using a project, all other acorn commands, such as `acorn ps` or `acorn run` will be executed within that project. So, for example, if you switch to project `my-new-project` and then run `acorn ps`, you won't see any applications that were launched in the default `acorn` project.

### Remove project

To remove or delete a project, simply run the `rm` command:

```bash
acorn project rm my-new-project
```

This will cause the project and all related resources to be deleted.

### Specifying a different project at runtime

All acorn commands now support the `--project` (or `-j`) flag for specifying the project just for that command. So, for example, the following command would create an application in the `development` project, regardless of which project you were currently using:

```bash
acorn -j development run ghcr.io/acorn-io/hello-world
```
