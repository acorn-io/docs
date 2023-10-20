---
title: Overview
---

Applications that need databases can leverage Acorns that provide a database.

## Services

Acorn allows you define and deploy multiple containerized applications and link them together. This can be done by defining multiple containers in a single Acornfile or by deploying multiple Acorns and linking them together. When it comes to data services there is a draw back to the approach because the user needs to look at each Acorns definition and map the configuration values to the consuming containers. Something simple like one container using `user` instead of `username` can cause a misconfiguration and require an update to the Acornfile.

To address this problem Acorn provides a standardized `service` type that can be used to simplify the configuration between applications. Allowing multiple Acorns that implement the same `service` can easily be swapped out and replaced without any updates to the consuming Acornfile.

### Service Structure

All services have the same basic structure:

```acorn
services: name: {
    address: ""
    ports: []
    secrets: []
    data: {}
}
```

a consuming app can then reference the service by name. In this example the service is named `db`, but it could be named something else:

```acorn
services: db: {
    address: "db.address"
    ports: "3306"
    secrets: ["admin"]
    container: "mariadb"
    data: {
        dbName: "mydb"
    }
}

containers: app: {
    image: "myapp"
    env: {
        DB_HOST: "@{services.db.address}"
        DB_PORT: "@{services.db.ports.3306}"
        DB_USER: "@{services.db.secrets.admin.username}"
        DB_PASS: "@{services.db.secrets.admin.password}"
        DB: "@{services.db.data.dbName}"
    }
}

containers: mariadb: {
    image: "mariadb"
    env: {
        MYSQL_ROOT_PASSWORD: "secrets://admin/password"
    } 
}

secrets: admin: {
    type: "basic"
    data: {
        username: "root"
        password: ""
    }
}
```

In this example the `app` container is using the `db` service, and not the `mariadb` container directly. By using the service interface, when it comes time to deploy to production and the application operators want to use a managed service like RDS, the service can be swapped out without updates to the package Acorn.

## Services Versions

The versioning schema for the Acorns providing database services follow the following schema:

```shell
[Upstream version]-[Acorn Package Number]
```

Where the upstream version matches the version of the software packaged in the Acorn. For instance if MariaDB 10.11.5 is being packaged the initial Acorn version would be:

```shell
v10.11.5-0
```

If there is a change to the Acorn that does not change the upstream version, the Acorn package number will be incremented.

In the event the upstream versions only support major and minor versions, then no patch version will be included. For instance if the upstream version is 10.11, the Acorn version would be:

```shell
v10.11-0
```
