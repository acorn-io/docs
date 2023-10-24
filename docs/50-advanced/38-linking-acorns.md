---
title: Linking Acorns
---

Acorns can link to other Acorns at runtime to provide supporting services. For instance, if you have an Acorn running PostgreSQL, it can be used to provide the `db` service to another app.

The general linking syntax is as follows:

```shell
acorn run --link <source>:<alias> [IMAGE]
```

`<alias>` is the name that the new Acorn app can use to resolve the linked service.

`<source>` is one of the following:

- The name of another Acorn in the same project, if that Acorn only has one container
- A reference to a particular container in a different Acorn in the same project, in the format `<acorn>.<container>`
- An Acorn that provides a service. If that Acorn provides multiple services the `default` service will be used if unspecified. To specify another service use the format `<acorn>.<service_name>`.

## Linking Acorns that expose services

If you have an Acornfile that has an app container and an data container that is consumed by a service like so:

```acorn
services: db: {
    container: "redis"
    ports: ["6379"]
    address: "redis"
}

containers: redis: {
    image: "redis"
    ports: ["6379/tcp"]
}

containers: app: {
    image: "foo"
    env: {
        REDIS_HOST: "@{services.db.address}"
        REDIS_PORT: "@{services.db.ports.6379}"
    }
}
```

You could replace the redis db with another implementation, say one from redis cloud at runtime. Assuming an existing running rediscloud acorn has been launched in the project, you could link to it like so:

```shell
acorn run --link rediscloud.redis:db .
```

When run from the source directory of the Acornfile will create a new Acorn but instead of the container will use the rediscloud database instead of the container.
