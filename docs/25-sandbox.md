---
title: Sandbox
---

Acorn Sandbox environments are like home labs in the cloud and provide a way to quickly try out and create Acorns. Anyone with a GitHub account can create an account on Acorn and have access to a Sandbox environment.

A Sandbox allows an Acorn to be deployed and run for 2 hours and then is deleted after 8 hours. You can use Sandbox as often as you like and can deploy as many Acorns as you like. Sandboxes are limited to consuming 4GB of RAM and 10GB of storage at a time.

Acorns deployed in the Sandbox can be accessed via a public URL with SSL. The Acorns running in the Sandbox can be interacted with via the Acorn CLI or through the UI.

## Environment

The Sandbox regions are multi-tenant environments that are shared with other Sandbox users. The Sandbox regions are designed to be used for development and testing purposes. Because of the time boxed nature of the Sandbox environments, they are not setup to be used for production workloads.

## Running in Sandbox

Every user has a Sandbox environment. The Sandbox is in the "Sandbox US East" region. When applications are launched into this environment a count down timer is displayed in the UI to let you know when the application will be shut down.

Each Acorn runs with it's own two hour window. You can run as many Acorns as you like in the Sandbox environment as long as aggregated they are consuming less then 4GB of RAM and 10GB of storage allocated. If you need to run for longer periods or require additional resources, you can upgrade to a pro account.
