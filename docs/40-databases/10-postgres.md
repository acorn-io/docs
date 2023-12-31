---
title: Postgres
---

## Overview

The Postgres Acorn provides a containerized instance of Postgres. It is designed to be suitable for development environments. The data volume is backed by persistent volumes in the cluster, but the service is not considered highly available. It can easily be swapped out for other Acorns that implement the service interface, like RDS, in production environments.

The Acorn results in a service that follows the structure:

```acorn
services: db: {
    default: true
    container: "postgres"
    secrets: ["admin"]
    ports: "5432"
    data: dbName: "postgres"
}
```

The admin secret has the root credentials for the entire database. The username and password for this user should be obtained from the secret by using `@{services.db.secrets.admin.username}` and `@{services.db.secrets.admin.password}`.

## Usage

The Postgres Acorn can be used by defining a service in your Acornfile:

```acorn
services: postgres: {
    image: "ghcr.io/acorn-io/postgres:v15.#-#" // pulls the latest 1.x version
}

containers: "my-app": {
    image: "my-app"
    ports: publish: "80/http"
    env: {
        DB_USER: "@{service.postgres.secrets.admin.username}"
        DB_PASS: "@{service.postgres.secrets.admin.password}"
        DB_HOST: "@{service.postgres.address}"
        DB_PORT: "@{service.postgres.ports.5432}"
        DB_NAME: "@{service.postgres.data.dbName}"
    }
}
```

The example will use the latest version of Postgres 15 that has been packaged as an Acorn.

## Examples

See [examples folder](https://github.com/acorn-io/postgres/tree/main/examples) for a sample application using this service.
