---
title: From Playground
---

The Acorn playground allows you to develop Acornfiles directly in the Web UI. Providing a great way to get started with Acorn without having to install anything on your machine. You can try deploying a single container or a whole application by providing a source repository URL. The playground will clone and build the Acorn image for you. The changes you make to the file will cause real updates to the running Acorn in the sandbox. When you are done, you can export the Acornfile to add to your repository or share the Acorn image with others.

## Using Playground to Deploy an Existing Container Image

Click on the Playground button in the upper right hand corner, you will see an editor that allows you to start typing an Acornfile. A simple Nginx container is defined as a guide for you already. You can make changes to this file as needed, changing the image, adding ports, and environment variables to define the parameters needed for your container. When you are ready, click deploy to launch the container into the Sandbox. You can continue to edit and make changes to the Acornfile to update the deployment. For instance, you can add a published port to the container to get a public URL and TLS certificate.

For example to build a Wordpress Acorn in the playground editor paste in the following:

```acorn
services: db: {
    image: "ghcr.io/acorn-io/mariadb:v10.#.#-#"
}

containers: wp: {
    image: "wordpress"
    ports: publish: "80/http"
    env: {
        WORDPRESS_DB_HOST:     "@{services.db.address}"
        WORDPRESS_DB_USER:     "@{services.db.secrets.admin.username}"
        WORDPRESS_DB_PASSWORD: "@{services.db.secrets.admin.password}"
        WORDPRESS_DB_NAME:     "@{services.db.data.dbName}"
    }
}
```

<!--
## Using Playground to deploy an existing containerized application from a source repository

Click on the Playground button in the upper right hand corner, you will see an editor that allows you to start typing an Acornfile. On the right hand side of the Playground file view, there is a checkbox to read files from a git repo. Select that box, and then you can type in the repo URL and Acorn will clone the repo and build the Acorn image from the Acornfile in the editor. If there is an existing Acornfile in the repo, it will be ignored.

For example a simple Acornfile that will build the Dockerfile in the root of the repository, you can enter in the following:

```acorn
containers: myapp: {
    build: context: "."
}
```

The container defined in the file will be built during the Acorn build process. You can now click "Run" to launch the application into the Sandbox. You can continue to edit the Acornfile to configure the application container. You can also add additional services, containers, volumes, etc to completely define running the application through Acorn.
-->