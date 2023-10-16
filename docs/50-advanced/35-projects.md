---
title: Acorn Projects and Collaboration
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

## Manage Project Regions

By default, everyone has access to a free Sandbox region. Once you have upgraded to a "pro", "teams", or "enterprise" plan you have access to additional regions. Once you have a pro account you can add it to your projects from the Acorn dashboard.

For users of the "teams" and "enterprise" plans, after you have added an AWS cloud account to Acorn, you can add those additional regions to your project. This will allow you to deploy Acorns to the regions you have added.

### Add a region to a project

To add a region to a project, go to the project page and click the settings tab. On the settings tab you will see a list of toggles for available regions. Here you can toggle on additional regions for your project.

### Remove a region from a project

You can also remove regions from the project by toggling them off. This will not remove any Acorns that have already been deployed to the region. In the case of your own AWS account, when you remove the region from ALL projects it will remove the resources provisioned to run your Acorns.

## Manage Project Members

Projects also support collaborating with other Acorn users. All plans allow you to add additional collaborators to the project. Collaborators can have different roles within the project providing flexibility in how you allow others to interact with your project.

### Adding a Project Member

To add a project member, go to the project settings tab in the dashboard. Under the "Members" section select the invite box. Here you can search for the GitHub username you want to invite. You also select the role you want to assign to the member.

### Removing a Collaborator

To remove a project member, go to the project settings tab in the dashboard. Under the "Members" section select "remove" from the (...) menu next to the member name.
