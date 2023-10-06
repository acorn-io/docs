---
title: Overview
---

## Services

Acorn allows you define and deploy multiple containerized applications and link them together. This can be done by defining multiple containers in a single Acornfile or by deploying multiple Acorns and linking them together. The draw back to this approach is the user needs to look at each definition and map the configuration values to the consuming containers. Something as simple as one using `user` instead of `username` can cause a misconfiguration and require an update to the Acornfile.

To solve this problem Acorn provides a standardized `service` type that can be used to simplify the configuration between services. So multiple Acorns that implement the same `service` can easily be swapped out and replaced without any updates to the consuming Acornfile.

All services have the same basic structure:

```acorn
services: name: {
    address: ""
    ports: []
    secrets: []
    data: {}
}
```

a consuming app can then reference the service by name:

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

In this example the `app` container is using the `db` service. The `db` service is defined in the same Acornfile and the `app` container is referencing the `db` service by name. The `app` container is using the `db` service to get the `address`, `ports`, `secrets`, and `data` values. The `app` container is then using those values to configure the `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, and `DB` environment variables.

By using the `service` type the `app` container can easily consume another database service that implements the same `db` service in the Acornfile. This allows more flexibility in the deployment of the `app` Acorn. For instance, the RDS Aurora MySQL service implements the `db` service. So the `app` Acorn can be deployed to a local development environment using the `mariadb` container and then deployed to production using the `rds` container without any changes to the `app` Acornfile.
