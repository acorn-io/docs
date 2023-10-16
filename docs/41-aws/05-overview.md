---
title: Configure Acorn for AWS
---

## Overview

Acorn can be configured to deploy and manage applications in your AWS account. The Acorn platform will provision and manage all of the components needed to deploy and run your applications. With Acorn managing the resources, developers will be able to provision and consume AWS services from your account without needing to have direct access to the AWS console.

## Setting up AWS

### AWS Keys

For Acorn to manage infrastructure in your AWS account, you will need to provide a temporary set of keys that Acorn can use to provision and manage resources. The keys will be used to create an IAM role that Acorn can assume to manage resources in your account. The keys will only need to be provided once while setting up and can be revoked after the Acorn platform has been configured.

The AWS Keys can be from an IAM user with administrative permissions. The keys can be temporary and provided with an STS token, or permanent keys can be used for the initial setup.

Once you have the AWS keys, go to the Acorn dashboard and click on the dropdown in the top right corner next to where your username is displayed. Then click on the `Manage Cloud Accounts` option.

This will open a modal to provide the AWS keys and select a region. Enter the keys into the text fields, and select a default AWS region from the drop-down. The region selection can be changed later if needed. Then click "Setup" to start provisioning in your account.

The Acorn provisioning process will create the IAM roles, VPC, Security Groups, and worker nodes needed to run your applications. The process can take several minutes to complete. Once this process is complete, you will be able to deploy applications to your AWS account.
