---
title: From Image
---

## Deploying an Acorn from an Image

Acorn images are packages that contain all of the containers and configuration needed to deploy an application. These images are built using `acorn build` and published to registries in the same way Docker containers are shared. To learn more abut building and publishing images, see [publishing images](/advanced/publishing).

## Deploying an Image from the CLI

Assuming you have already [installed acorn cli](/install#acorn-cli) and [logged in](/getting-started#acorn-login) to the Acorn platform you can run the following command to deploy an Acorn image:

```shell
acorn run [IMAGE_NAME]
```

If we wanted to run the `ghcr.io/acorn-io/hello-world` image we would run:

```shell
acorn run ghcr.io/acorn-io/hello-world
# proud-frog
# STATUS: ENDPOINTS[] HEALTHY[] UPTODATE[] 
# STATUS: ENDPOINTS[] HEALTHY[0] UPTODATE[0] waiting for quota allocation
# STATUS: ENDPOINTS[] HEALTHY[0] UPTODATE[0] (container: webapp): pending
# STATUS: ENDPOINTS[https://proud-frog-738f9260.0bh0qd.on-acorn.io] HEALTHY[0/1] UPTODATE[1] (container: webapp): ContainerCreating
# ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
# | STATUS: ENDPOINTS[https://proud-frog-738f9260.0bh0qd.on-acorn.io] HEALTHY[1] UPTODATE[1] OK |
# └─────────────────────────────────────────────────────────────────────────────────────────────┘
# 
# ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
# | STATUS: ENDPOINTS[https://proud-frog-738f9260.0bh0qd.on-acorn.io] HEALTHY[1] UPTODATE[1] OK |
# └─────────────────────────────────────────────────────────────────────────────────────────────┘
# 
```

You will see output similar to what is shown above. The first line is the name of the app that was created, in this case `proud-frog`. The next few lines are the status of the app. The last line is the URL to access the app.

## Deploying an Image from the UI

In the UI, click the "Create" button from within the project view. Then select "From Acorn Image". Next, you can assign a name, or let one like `proud-frog` be generated for you. Then enter in the image you would like to deploy. In this case we will use `ghcr.io/acorn-io/hello-world`. Finally, click the "Create" button.
