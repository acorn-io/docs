---
title: Connect to Existing Databases
---

## Overview

Acorn offers capability to connect to existing databases outside of the Acorn platform. Some Acorns have been built to allow swapping out the containerized implementations with production grade databases. If you do not see the database solution you are need, you can build your own or leverage Acorn secrets to connect to your database solution.

## External Database Services

Acorn supports connections to various databases accessible via the internet through these external service Acorns. The services below use popular DBaaS providers as an example, but it should be possible to use these for other services as well. It is important to note that the database must exist before trying to use any of these Acorns.

### MongoDB

Image: ghcr.io/acorn-io/mongodb-external:v#.#.#

Docs: [MongoDB External Service With Atlas](https://github.com/acorn-io/mongodb-external/blob/main/README.md#how-to-use-with-mongodb-atlas)

### MySQL/Mariadb

Image: ghcr.io/acorn-io/mysql-external:v#.#.#

Docs: [MySQL from PlanetScale](https://github.com/acorn-io/mysql-external#example)

### Postgres

Image: ghcr.io/acorn-io/postgres-external:v#.#.#

Docs: [Postgres from Neon](https://github.com/acorn-io/postgres-external#how-to-use-with-neon-tech-postgres)

### Redis

Image: ghcr.io/acorn-io/redis-external:v#.#.#

Docs: [Redis from Redis Cloud](https://github.com/acorn-io/redis-external#example-using-redis-cloud-service)
