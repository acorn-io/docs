---
title: MongoDB
---

## What is MongoDB ?

MongoDB is a popular, open-source NoSQL database system that uses a document-oriented data model. It operates with documents in a human-readable JSON-like format. It's known for its scalability and flexibility, allowing for complex queries, indexing, real-time aggregation, and server-side JavaScript execution.

## Mongo as an Acorn Service

This Acorn provides a MongoDB database as an Acorn Service.  It can be used to easily get a MongoDB database for your application during development.

The Acorn image of this service is hosted in GitHub container registry at

```shell
ghcr.io/acorn-io/mongodb:v6.#-#
```

This MongoDB instance:

- is backed by a persistent volume
- uses a default (auto generated) password for the root user
- defines credentials for an additional user (with access limited to a given database)

By default:

- *dbUser* of the additional user is automatically generated
- *dbName* is set to "mydb"

These values can be changed using the *serviceArgs* property as follow:

```
services: db: {
  image: "ghcr.io/acorn-io/mongodb:v#.#-#"
  serviceArgs: {
    dbUser: "bar"
    dbName: "foo"
  }
}
```

## Examples

See [examples folder](https://github.com/acorn-io/mongodb/tree/main/examples) for a sample application using this service.
