---
title: CD with Automatic Upgrades
---

Once images are being published through a CI workflow you can configure Acorn to automatically deploy updates to your environments. Acorn provides mechanisms to control the rollout of these updates based on versions and approvals.

To learn more about the available regex patterns for versioned tags to use with autoupgrades, see the [auto upgrades reference](/reference/auto-upgrades).

## AutoUpgrades from run command

When you run an Acorn from the CLI you can specify the autoupgrade settings. The command is:

```shell
acorn run -n hello-world --auto-upgrade ghcr.io/acorn-io/hello-world:v#.#.#
```

Now whenever a new versioned image is pushed to the acorn-io/hello-world repository, Acorn will automatically upgrade the running Acorn to the new version.

## Upgrade Notifications

Some environments need a manual approval before upgrading. Acorn provides a mechanism to notify users when an upgrade is available and allow them to approve the upgrade.

```shell
acorn run -n hello-world --notify-upgrade ghcr.io/acorn-io/hello-world:v#.#.#
```

Now Acorn will indicate when an upgrade is available and allow you to approve the upgrade. To approve:

```shell
acorn update --confirm-upgrade hello-world
```

Earlier, we named the Acorn `hello-world`. This name is used to reference the Acorn when updating it.

## Auto Upgrades from Acornfile

Acorn supports using an Acornfile to describe the deployments of other Acorns and services. This allows you to declaratively define deployments in Acorn along with the upgrade strategies. Take a simple WordPress example:

```acorn
services: mariadb: {
    image:         "ghcr.io/acorn-io/mariadb:v1.0.#"
    autoUpgrade:   true
    notifyUpgrade: true
}

acorns: wordpress: {
    image: "example.com/acorn-io/wordpress:v1.#.#"
    autoUpgrade: true
    services: ["mariadb:db"]
}
```

In the above Acorn a service is defined for mariadb with autoupgrade set to true. The `mariadb` service will only update on a patch release. Since this is our data layer, we also set notifyUpgrade instead of just auto upgrading.

The `wordpress` Acorn is defined with autoUpgrade set to true. This will automatically upgrade the Acorn to the latest minor release because of the `v1.#.#` regex in the tag. Since this is a presentation layer without state, we will allow the autoupgrade.

Once this is Acorn has been built and deployed, it will setup our delivery pipeline for our Acorns. Now every time CI produces a new versioned image, it will automatically be deployed to our environment.
