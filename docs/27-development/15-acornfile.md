---
title: Configure Acornfile Dev Settings 
---

## Overview

Applications have different settings when running in development vs production. Acorn supports providing different values in production and development directly in the Acornfile. The top-level `profiles` key lets the author define different values for different scenarios. Each profile can specify a different default value for the arguments defined by the Acornfile.

In the case of development versus running the application in a non-development setting there is a built-in boolean argument `args.dev` that is true when Acorn is run in development mode.

## Development vs Production Acornfile

Several popular frameworks have development servers that run on a non-production port and provide support for the hot-reloading of source files during development. For example, the static website-generating app Hugo has a development server that runs on port 1313 and automatically generates a new version of the site when a source file is changed.

Let's take a look at a sample Hugo development setup with Acorn. The Dockerfile for the Hugo site looks like:

```docker
FROM klakegg/hugo:0.101.0-alpine as hugo

ADD ./ /src
WORKDIR /src

EXPOSE 1313
CMD [ "server", "--bind", "0.0.0.0", "-D" ]
```

To support development

```acorn
containers: {
    site: {
        build: {
            context: "."
        }
        ports: publish: "1313/http"
        dirs: {
            "/src": "./"
        }
    }
}
```

In the setup above the Acornfile is set up to support the Hugo Docker development workflow. It will synchronize the files in the current directory to the `/src` directory in the container. As files are changing the developer will be able to review them in the browser by navigating to the Acorn provided URL.

This works for development, but when it comes time to publish the site to a production environment meant for users to access it, there are different settings and configurations needed. In this example, the site should be hosted from a web server like Nginx and on standard web ports.

Using the features of Acorn and multi-stage Docker builds we can create a setup that will work for both development and production in a single Acornfile.

First, update the Dockerfile to support a `static` mode that will host the built site in Nginx.

```docker
FROM klakegg/hugo:0.111.3-alpine AS hugo

ADD ./ /src
WORKDIR /src
RUN mkdir -p /target && \
    hugo -d /target/ --minify

FROM nginx AS static
COPY --from=hugo /target /usr/share/nginx/html

FROM hugo AS dev
EXPOSE 1313
CMD [ "server", "--bind", "0.0.0.0", "-D" ]
```

In the Dockerfile above we set up a base target called `hugo` along with a development `dev` and `static` production target. The `hugo` target will always build the contents of the site and the other targets will determine how the site is served up.

Now that the Dockerfile is prepared, we can update the Acornfile to support the different scenarios. We will use the built-in `args.dev` to configure the build target, port, and if files should be synchronized.

```acorn
containers: {
    site: {
        build: {
            context: "."
            target: std.ifelse(args.dev, "dev", "static")
        }
        ports: publish: std.ifelse(args.dev, "1313/http","80/http")
        if args.dev {
            dirs: {
                "/src": "./"
            }
        }
    }
}
```

In the above Acornfile, we are now using the `args.dev` argument to determine how to deploy our application. When a developer wishes to make changes and develop locally, they run `acorn dev .` and the Acornfile will be run in development mode. When it is time to publish the site a normal `acorn build .` will build the site into the `static` target ready to be deployed into a production environment.

## Using a Debugger

Acorn supports defining ports to attach debuggers when in development mode. When a `dev` port is defined Acorn will create a port-forward from localhost to the remote container. This allows you to attach a debugger to the application running in the container. The port is always defined as TCP and will be available on localhost.

For example setting up Node.js debugging tools could be done like this.

```acorn
containers: {
    app: {
        build: {
            context: "."
        }
        // ...
        ports: dev: "9229"
        if args.dev {
            command: ["node", "--inspect=0.0.0.0:9229"]
        }
        // ...
    }
}
```

**Note:** This would require a node.js app to be configured to run in the container.
