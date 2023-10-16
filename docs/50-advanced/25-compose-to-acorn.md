---
title: Convert from Docker Compose
---

This provides a high level guide to manually translate Docker Compose concepts into Acornfiles. There isn't an automated tool available, but this guide should cover some of the basics.

## Conceptual Differences

### AML vs. YAML

An Acornfile is written in Acorn Markup Language (AML) where Docker Compose files are written in YAML. The syntax is similar, but there are some differences.

### Compose Services

In Docker Compose, a service is a where containers are defined. In Acorn, containers are defined under containers.

### Compose Networks

There is no direct translation for Docker Compose networks in Acorn. Acorn uses Kubernetes networking under the hood that provides a single network for containers to consume.

### Compose Configs

Compose provides a top level configs key that can be used to define configuration values to be consumed in compose 'services'. Acorn has the ability to provide configuration data to containers through files, secrets, and arguments to the Acorn.

### Acorn Services

Acorn has the concept of services that provide a way to define an interface for containers to consume the components. These service interfaces can be implemented by a container or a cloud provider. If they both implement the same interface, they can be swapped out without any changes to the consuming Acornfile.

## Example

### Two container Docker Compose file

To show basic usecase, lets Walking through a translation of a Docker Compose file to an Acornfile. We will convert this Docker Compose file to an Acorn that has a container for the Gitea application and consumes a Postgres service from another Acorn.

```yaml
services:
  gitea:
    image: gitea/gitea:latest
    environment:
      - DB_TYPE=postgres
      - DB_HOST=db:5432
      - DB_NAME=gitea
      - DB_USER=gitea
      - DB_PASSWD=gitea
    restart: always
    volumes:
      - git_data:/data
    ports:
      - 3000:3000
  db:
    image: postgres:alpine
    environment:
      - POSTGRES_USER=gitea
      - POSTGRES_PASSWORD=gitea
      - POSTGRES_DB=gitea
    restart: always
    volumes:
      - db_data:/var/lib/postgresql/data
    expose:
      - 5432
volumes:
  db_data:
  git_data:
```

Now lets look at the corresponding Acornfile:

```acorn
services: postgres: {
    image: "ghcr.io/acorn-io/postgres:v#.#.#" // pulls the latest 
    serviceArgs: dbName: "gitea"
}

containers: gitea: {
    image: "gitea/gitea:latest"
    ports: publish: "3000/http"
    dirs: "/data": "volume://git-data"
    env: {
        DB_TYPE: "postgres"
        DB_HOST: "@{services.postgres.address}"
        DB_NAME: "@{services.postgres.data.dbName}"
        DB_USER: "@{services.postgres.secrets.admin.username}"
        DB_PASSWD: "@{services.postgres.secrets.admin.password}"
    }
}

volumes: "git-data": {}
```

Here the `gitea` container is using the `postgres` service for the database. The `postgres` service is another Acorn that deploys Postgres and provides the information needed to the the `gitea` container to connect to the database. The benefit of this deployment is that we could also use the RDS Acorn in AWS to deploy a Postgres RDS instance and the `gitea` container would not need to have any of its settings changed.

The `gitea` container is publishing port 3000 which will have a URL and corresponding TLS Certificate provided by Acorn.
