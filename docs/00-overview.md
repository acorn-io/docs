---
title: Home
slug: /
---

## What is Acorn?

Acorn is an app platform that makes it easy to build, share, and run containerized applications. Acorn provides a comprehensive way to describe your application and dependencies in a single file called an Acornfile. The Acornfile built and packaged up into a single artifact that contains everything needed to deploy your application, and can be shared with a link that will allow it's recipients to have a one click deployment into a sandbox environment.

## Key Features

### Acorn Sandboxes

Acorn Sandboxes are free compute environments in the cloud for anyone with a GitHub account to run, test, and develop Acorns. Sandboxes can be used as often as you like to run Acorns for up to 2 hours at a time. Sandbox environments allow for consuming up to 4GB of ram and up to 10GB of storage space. Acorns launched in the sandbox environment can be accessed via a public URL with SSL. The Acorns running in the Sandbox can be interacted with via the Acorn CLI or through the UI.

### Acornfiles and Acorn Images

Acornfiles provide a simple way to describe how to deploy containers, services, volumes, secrets, jobs, and configuration for an entire application. These files are then built into Acorn images, similar to the way a Dockerfile is built into a Docker image. The Acorn image is then published to a registry and can be deployed into any Acorn environment. The process of building Acorn images is easily integrated into existing CI pipelines through the Acorn CLI. Acorn natively supports auto upgrading when new Acorn images are published to a registry.

### Sharable Acorn Links

Acorn links allow you to share an Acorn image via status button, URL, Website, or QR code. Users who click on this link will be able to deploy the Acorn into their own Acorn Sandbox environment. Links are easily created within the Acorn UI and provide statistics for the publisher on how many times the link has been used.

### Developer Focused

Acorn makes it easy to develop applications in containers. Acorn provides a built in development mode that can enable file syncing into containers, port forwarding, and the ability to hook up debuggers to your applications.

Developing Acornfiles for your application can be done directly from the Acorn UI in the playground environment without needing to install anything on your local machine. For developers who prefer to work in an IDE there is a Visual Studio Code Acorn extension to ease development of Acornfiles. This extension provides syntax highlighting, formatting, and more.

### Production Environments

Acorn pro, teams, and enterprise accounts provide access to production grade environments. Sandboxes are still available with the 2 hour time limit, but access to regions that do not have 2 hour time restrictions on running Acorns along with additional access to resources. Running Acorns are billed by resource consumption. Production environments are run on AWS

### AWS Management

Acorn teams and enterprise users can provide AWS credentials to Acorn to create dedicated environments in their own AWS accounts. Acorn will provision the underlying compute infrastructure along with the networking, IAM, storage, and registry components needed to run a production grade application. Pay for these resources directly to AWS.

Users can also deploy Acorn services that provision and manage AWS resources like RDS, DynamoDB, and S3 buckets in their own AWS account without the developer needing to know Terraform or CloudFormation. Acorn manages the IAM roles and access to ensure only the provisioned resources are accessible to the application.
