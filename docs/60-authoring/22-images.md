---
title: Images
---

## Overview

When you want to conditionally deploy a container or Acorn based on the user's preference, you can use the `images` block in your Acornfile to ensure the images are included in the final image.

To understand when to use `images`, review the following example Acornfile:

```acorn
args: enableRedis: false

if args.enableRedis {
    containers: redis: {
        image: "redis"
    }
}

containers: app: {
    image: "myapp"
    if args.enableRedis {
        dependsOn: ["redis"]
    }
}
```

In this simple Acornfile the `redis` container is only deployed if the user provides the `--enableRedis` argument. If the user does not provide the argument, the `redis` container is not included in the deployment. The problem that arises is during the build process, Acorn will not see the `redis` container and will not include it in the final image. This will cause the `app` container to fail to start when deployed with an image not found error.

To address this, you can use the `images` block to ensure the `redis` container is included in the final image:

```acorn
args: enableRedis: false

if args.enableRedis {
    containers: redis: {
        image: images.redisimage.image
    }
}

containers: app: {
    image: "nginx"
    if args.enableRedis {
        dependsOn: ["redis"]
    }
}

images: redisimage: image: "index.docker.io/redis"
```

Now when the end user deploy's the resulting Acorn they can successfully enable the `redis` container by providing the `--enableRedis` argument.

## Usage

The `images` block is a map of images and how to reference them from a registry, build from a Dockerfile, or build an Acornfile.

Here is an example of each.

```acorn
...
images: {
    // Can be a container or Acorn image in a registry
    fromimage: image: "index.docker.io/redis"
    // The same fields from a container build can be used here.
    fromdockerfile: build: {
        context: "."
    }
    // Same fields as an Acornfile build can be used here.
    fromacornbuild: build: {
        context: "."
        acornfile: "Acornfile"
    }
}

containers: {
    "registry-image": {
        image: images.fromimage.image
    }
    "docker-build": {
        build: images.fromdockerfile.build
    }
}

acorns: {
    "from-registry": {
        image: images.fromimage.image
    }
    "from-acorn-build": {
        build: images.fromacornbuild.build
    }
}
```
