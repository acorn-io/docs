---
title: Manual Upgrades
---

When upgrading an Acorn app, you do not need to pass in all arguments on every update. The args are persisted between runs and only the passed in updates are changed. We recommend using an Acornfile to describe your deployment and setting up an automated pipeline for production.

View our section on using [GitHub Actions](/advanced/ci-gh-actions) to build Acorn images.
View our section on [AutoUpgrades](/advanced/cd-autoupgrades) to automatically deploy updates.

## What happens during an upgrade

During an upgrade:

1. Container images are updated.
1. Secrets are deployed.
1. Jobs are run.

## Updating a running image

To upgrade the image in production

```shell
acorn update --image [NEW-IMAGE] [APP-NAME]
```

This will replace the Acorn, and if new container images or configurations are provided, the application containers will be restarted.

## Updating parameters

Deployed Acorns can have their parameters changed through the update command. Depending on the parameters being updated it is possible that network connectivity may be lost or containers restarted.

When updating args for the Acorn app, the behavior will be dependent on how the Acorn app was designed/written. Look for documentation from the Acorn app author to understand what is possible and how to operate the Acorn app.

## Updating published DNS names

If an Acorn was deployed like:

```shell
$ acorn run -p my-app.test.example.com:web [IMAGE] --replicas 3 --cluster-mode active-active
purple-field
```

The app DNS can be updated by running:

```shell
acorn update -p my-app.example.com:web purple-field
```

Only the argument being changed needs to be passed in.

### run --replace

Similarly to `acorn run --update`, `acorn run --replace` will create or update an existing acorn with ONLY the provided flags and args. Any previous modifications will be replaced.

If we attempt a replace on the previous acorn, we should see the label be dropped

```bash
$ acorn run --replace -n awesome-acorn -- --msg 3

$ acorn app awesome-acorn -o yaml                  
---
metadata:
  creationTimestamp: "2023-03-23T20:11:11Z"
  generation: 3
  name: awesome-acorn
  namespace: acorn
  ...
status:
  appImage:
    acornfile: |
      containers: {
        nginx: {
          image: "nginx"
          ports: publish: "80/http"
          files: {
            "/usr/share/nginx/html/index.html": "<h1>My " + args.msg + " Acornfile</h1>"
          }

          mem: 128Mi
          labels: {
                      key: "test-value"
                  }
        }
      }
   ...
```
