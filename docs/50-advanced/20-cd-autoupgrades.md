---
title: CD with Automatic Upgrades
---

Once images are being published through a CI workflow you can configure Acorn to automatically deploy updates to your environments. Acorn provides mechanisms to control the rollout of these updates to each environment.

## Acornfiles

It is recommended that you use an Acornfile that describes all of the Acorn's that make up your application. This will make it easier to manage the rollout of updates to your application, and provide you a declaritive way to describe your application.

## Autoupgrade

Auto upgrades work by watching the registry for updates to the Acorn image tags. This enables multiple workflow scenarios to meet your teams needs.

### Environment Promotion with moving tags

In the promotion model, tags are used to define which environment the image is deployed to. For instance tags like "main", "dev", "test", and "prod" can be used to define what app is deployed where. To move a version of the software from dev to test, the dev image would be tagged with test and pushed to the registry.
