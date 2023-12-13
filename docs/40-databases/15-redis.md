---
title: Redis
---

## Redis Database

Redis is an in-memory data store, used as a database, cache, and message broker. It supports various data structures such as strings, hashes, lists, sets, and more, offering high performance and wide-ranging versatility. More information on [https://redis.io](https://redis.io/).

## Redis as an Acorn Service

This Acorn provides a Redis database as an Acorn Service.  It can be used to easily get a Redis database for your application during development. The current service runs a single Redis container backed by a persistent volume and define a password for the default admin user.

## Acorn image

The Acorn image of this service is hosted in GitHub container registry:

```shell
ghcr.io/acorn-io/redis:v7.#.#-#
```

## Service configuration options

Currently this Acorn does not have any configuration options, but some could be added later on if needed.

## Usage

In the examples folder you can find a sample application using this Service. It consists in a Python backend based on the FastAPI library which returns the number of times the application was called. This incremental value is saved in the underlying Redis database and incremented with each request.

```acorn
services: db: {
    image: "ghcr.io/acorn-io/redis:v7.#.#-#"
}

containers: app: {
 image: "example-app"
 consumes: ["db"]
 ports: publish: "8000/http"
 env: {
  REDIS_HOST: "@{service.db.address}"
  REDIS_PASS: "@{service.db.secrets.admin.token}"
 }
}
```

## Examples

See [examples folder](https://github.com/acorn-io/redis/tree/main/examples) for a sample application using this service.
