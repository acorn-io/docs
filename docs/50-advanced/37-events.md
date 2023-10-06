---
title: Events
---

Events are collected from the system and available to users and admins to see what is happening in the system.

## Viewing Events

### Account level events

At the account level, you can view events on the main dashboard. This will show you all events for all projects in the account, along with any provisioning events from infrastructure provisioning in your cloud accounts.

To view, go to the Acorn dashboard and view in the `Recent Events` section.

### Project level events

Project level events are viewed in the main dashboard or on the CLI.

To view on the command line, simply run:

```shell
acorn events
```

To see events for the current project, you can see them for a specific project with the `-j <project>` flag.

In the UI you can view events on the events tab in the project view.

### Application Acorn scoped events

You can view app level events from the CLI by running the following command:

```shell
acorn events [APP_NAME]
```

This will output all of the events for a specific application.

From the UI you can select a deployed Acorn in the project view, and scroll down to the events section. There you can view a timeline or a list view of events captured for that application.
