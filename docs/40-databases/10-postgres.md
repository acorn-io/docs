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
    image: "ghcr.io/acorn-io/postgres:v1.#.#" // pulls the latest 1.x version
}

containers: "my-app": {
    image: "my-app"
    ports: publish: "80/http"
    env: {
        DB_USER: "@{services.postgres.secrets.admin.username}"
        DB_PASS: "@{services.postgres.secrets.admin.password}"
        DB_HOST: "@{services.postgres.address}"
        DB_PORT: "@{services.postgres.ports.5432}"
        DB_NAME: "@{services.postgres.data.dbName}"
    }
}
```
