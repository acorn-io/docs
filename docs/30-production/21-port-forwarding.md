---
title: Port Forwarding
---

If you need to access a port on a container that is not exposed publicly, you can use the `acorn port-forward` command to forward a port from the container to your local machine.

## Usage

If you have deployed the MariaDB Acorn and wanted to access the database directly without exposing it publicly, you could use the following command:

```shell
acorn run -n mariadb ghcr.io/acorn-io/mariadb:v#.#.#
# ...
acorn port-forward mariadb 3306
# Forwarding 127.0.0.1:3306 => 3306 for container [mariadb.mariadb-58464dcc55-hkxg5]
```

This will forward the port 3306 from the container to your local machine. You can then connect to the database in another terminal window:

```shell
# Get generated username and password
acorn secrets reveal mariadb.user
# .. Plain text values will be in the output
mysql -u<username> -p -h127.0.0.1 -P3306
# Enter password: 
# Welcome to the MySQL monitor.  Commands end with ; or \g.
# Your MySQL connection id is 3
# Server version: 5.5.5-10.11.5-MariaDB-1:10.11.5+maria~ubu2204 mariadb.org binary distribution
# 
# Copyright (c) 2000, 2023, Oracle and/or its affiliates.
# 
# Oracle is a registered trademark of Oracle Corporation and/or its
# affiliates. Other names may be trademarks of their respective
# owners.
# 
# Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
# 
# mysql>
```
