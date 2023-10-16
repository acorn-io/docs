---
title: From Playground
---

The Acorn playground allows you to develop Acornfiles directly in the Web UI. Providing a great way to get started with Acorn without having to install anything on your machine. You can try deploying a single container or a whole application by providing a source repository URL. The playground will clone and build the Acorn image for you. The changes you make to the file will cause real updates to the running Acorn in the sandbox. When you are done, you can export the Acornfile to add to your repository or share the Acorn image with others.

## Enabling Playground

In the Acorn UI, you can select "Preferences" from the account drop down in the upper right hand corner of the UI. On the preferences page, under advanced, you can enable "Dev Mode" with the toggle switch. Once you have toggled on the setting you can go to a project page and see the playground tab.

| *Note:* The playground can only be run in projects that have access to a Sandbox region.

## Using Playground to Deploy an Existing Container Image

Click on the Playground tab, you will see an editor that allows you to start typing an Acornfile. A simple Nginx container is defined as a guide for you already. You can make changes to this file as needed, changing the image, adding ports, and environment variables to define the parameters needed for your container. When you are ready, click deploy to launch the container into the Sandbox. You can continue to edit and make changes to the Acornfile to update the deployment. For instance, you can add a published port to the container to get a public URL and TLS certificate.

## Using Playground to deploy an existing containerized application from a source repository

Click on the Playground tab, you will see an editor that allows you to start typing an Acornfile. On the right hand side of the Playground tab, there is a text field to add the source repository URL. You can type in the repo URL and Acorn will clone the repo and build the Acorn image from the Acornfile in the editor. Assuming the Dockerfile is in the root of the repository, you will need to change the Acornfile in the editor to look like:

```acorn
containers: myapp: {
    build: context: "."
}
```

The container defined in the file will be built during the Acorn build process. You can now click "Run" to launch the application into the Sandbox. You can continue to edit the Acornfile to configure the application container. You can also add additional services, containers, volumes, etc to completely define running the application through Acorn.
