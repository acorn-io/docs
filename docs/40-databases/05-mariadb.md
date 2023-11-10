---
title: MariaDB
---

## Overview

The MariaDB Acorn provides a containerized instance of MariaDB through the Acorn service interface. It is designed to be suitable for development environments. The data volume is backed by a persistent volume in the cluster, but is not considered highly available.  It can easily be swapped out for other Acorns that implement the service interface, like RDS, in production environments.

The Acorn results in a service that follows this structure:

```acorn
services: db: {
    default:   true
    container: "mariadb"
    secrets: ["admin", "user"]
    ports: "3306"
    data: dbName: "instance"
}
```

The admin secret has the root credentials for the entire database and the user secret has credentials for full access to the database instance that was created.

## Usage

The MariaDB Acorn can be used by defining a service in your Acornfile:

```acorn
services: db: {
    image: "ghcr.io/acorn-io/mariadb:v10.#.#-#" // pulls the latest 1.x version
}
```

This definition uses all of the defaults for the Acorn when deploying. to consume the service you can reference it in your containers:

```acorn
services: db: {
    image: "ghcr.io/acorn-io/mariadb:v10.#.#-#" // pulls the latest 10.x.x version
}

containers: wp: {
    image: "wordpress"
    ports: publish: "80/http"
    consumes: ["db"]
    env: {
        WORDPRESS_DB_HOST: "@{service.db.address}"
        WORDPRESS_DB_PORT: "@{service.db.ports.3306}"
        WORDPRESS_DB_USER: "@{service.db.secrets.user.username}"
        WORDPRESS_DB_PASS: "@{service.db.secrets.user.password}"
        WORDPRESS_DB_NAME: "@{service.db.data.dbName}"
    }
}
```

The above Acornfile consumes the MariaDB service and uses the credentials to configure a wordpress instance. The service is automatically deployed when the Acorn is deployed. The general form of the service reference is:

```acorn
@{services.<service-name>.<property>}
```

The `secrets` property of a service is a list of secret names that can be referenced by a consuming container.

## Examples

See [examples folder](https://github.com/acorn-io/mariadb/tree/main/examples/my-todo) for a sample application using this service.
