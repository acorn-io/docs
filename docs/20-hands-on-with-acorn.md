---
title: Hands On With Acorn
---

This walk through guides you on how to use Acorn in your day to day workflow. By the end of this guide, you will be able to deploy and manage Acorns, services, access logs, explore volumes and secrets, and run the app in dev mode. Ensure that you are using the latest version of the Acorn CLI.  

## Prerequisites

This tutorial assumes that the following prerequisites have been completed:

The latest version of the Acorn CLI is installed and configured. For more information about installing or upgrading the Acorn CLI, refer to [Installing the Acorn Command Line Interface](install).

You have logged into the Acorn Dashboard through your GitHub credentials.  

## Deploying Acorn Apps

We will deploy a simple webapp that interacts with a MariaDB instance to perform CRUD operations.  

MariaDB is deployed from an Acorn that creates a service and injects the credentials as secrets into the application. This service is consumed by two Acorn apps – a job which will initialize the database by creating a table and inserting a set of sample records, and the webapp.  

Start by cloning the repo and spend a minute to explore the structure.  

```shell
git clone https://github.com/acorn-io/docs-hands-on-example:latest
cd docs-hands-on-example
tree
```

The resulting directory structure looks like this:

```shell
.
├── Acornfile
├── README.md
├── app
│   ├── Dockerfile
│   ├── package.json
│   ├── public
│   │   └── index.html
│   └── server.js
└── db-init
    ├── Dockerfile
    ├── init.js
    └── package.json
```

The app directory contains the code to expose the UI and API endpoints.

The db-init directory contains the code to initialize the database.

Both the directories have a Dockerfile that will be used to build container images.

The top-level directory has an Acornfile that brings everything together. The Acornfile defines the MariaDB service followed by the run-to-completion job to initialize the database, and finally the webapp. The parameters needed to connect to the database like the host, port, and credentials are injected into the job and the API backend through a set of environment variables.  

```shell
acorn run -n school
# ...
# school
# STATUS: ENDPOINTS[https://school-c60a2fb7.0bh0qd.on-acorn.io] HEALTHY[1] UPTODATE[1] pending
# ┌─────────────────────────────────────────────────────────────────────────────────────────┐
# | STATUS: ENDPOINTS[https://school-c60a2fb7.0bh0qd.on-acorn.io] HEALTHY[1] UPTODATE[1] OK |
# └─────────────────────────────────────────────────────────────────────────────────────────┘
```

Wait for the URL to become available and run the below command to access the API. Replace the URL with the actual URL generated for your app.  

Click the link, or open in the browser, to see the UI.

You can now add and remove students from the page.

## Exploring the Environment and Application

With the application running, let’s dig into the details.  

Running the below command shows Acorn that are deployed and running.  

```shell
acorn apps
# NAME        IMAGE                              COMMIT         CREATED     ENDPOINTS                                    MESSAGE
# 
# school.db   ghcr.io/acorn-io/mariadb:v1.0.0*   4935ab94ff11   3m30s ago                                                OK
# 
# school      bcd59c211a1b                       e0701dc2b023   3m33s ago   <https://school-c60a2fb7.0bh0qd.on-acorn.io>   OK
```

This shows our running web app along with the MariaDB acorn that is providing the service. If you forget the link, or close your terminal, you can run `acorn ps` to see the apps and their endpoints.  

You can stop the application without terminating it. This retains all the associated resources including the volumes.  

```shell
acorn stop school
```

Restart the application and check if the data is available.  

```shell
acorn start school
```

Reload the webpage, or run `acorn ps` to get the endpoint url to open in a browser.

You can also view the individual containers and jobs that are running within the application. Lets view the containers and jobs by running the following commands:

```shell
acorn containers
# NAME                          ACORN     IMAGE                                                                     STATE     RESTARTCOUNT   CREATED   MESSAGE
# school.app-5d4c88bd7f-56pt6   school    sha256:ed496878a1876aea3738620bdc0c1fcbf132b71707713d24dcbc62a2738475f9   running   0              21h ago   
# school.db.mariadb-55964dc9f-mm4b2   school.db   mariadb:10.11   running   0              21h ago 
acorn jobs
# NAME                                     STATE       LAST RUN    NEXT RUN   CREATED
# school.dbinit                            completed   9h ago      N/A        9h ago
```

Here you can see the containers and jobs that make up the school Acorn. Acorn separates the containers and jobs into their own groups. The containers are the long running processes that make up the application. The jobs are run-to-completion tasks that are typically used to perform management tasks. It is important to note though, a job is run in an container and can be used as a container input value to commands with `--container` flags.

## Accessing the Logs, Events, and the Shell

If you want to see what is happening with the application, or you need to troubleshoot, you can access the logs, events, and the shell of an Acorn.

### Viewing Logs

When the application is running, you can access the logs from all the containers or individual containers. Let’s access the consolidated logs from the application  

```shell
acorn logs school
```

To follow the output, we can add the -f switch.

```shell
acorn logs -f school
```

Now, when you hit the UI in the browser, you can see the access logs scrolling by.

If you want to access the logs of a specific container or a job, you can do so by first getting the container name and then accessing the logs.  

Let’s first look at the logs of the job. The job name is dbinit which is a part of the school Acorn.

```shell
acorn jobs school
# NAME                                     STATE       LAST RUN    NEXT RUN   CREATED
# school.dbinit                            completed   9h ago      N/A        9h ago
```

From the above, we know the job container name is `dbinit`. Let’s access the logs of the job.

```shell
acorn logs -c dbinit school
# dbinit-m2rm2.dbinit: Database is already up-to-date.
# dbinit-m2rm2.dbinit: Closing the database connection.
# dbinit-m2rm2.dbinit: Database connection closed.
```

You can explore the containers available within an Acorn app and then access the logs of individual containers.  

```shell
acorn container school
# NAME                         ACORN     IMAGE                                                                     STATE     RESTARTCOUNT   CREATED   MESSAGE
# school.app-99df6d4d6-n6vhj   school    sha256:9fba330fe1b8722e062bd27f8848fea400f6876e646d282fb7ea298165954c57   running   0              14m ago
```

You can now follow the logs emitted by the app container.

```shell
acorn logs -f school.app-99df6d4d6-n6vhj
# app-99df6d4d6-n6vhj: Server running on <http://localhost:3000>
# app-99df6d4d6-n6vhj: [2023-10-09T05:27:34.437Z] GET /students
# app-99df6d4d6-n6vhj: [2023-10-09T05:37:35.142Z] GET /students
```

Each HTTP request is written to STDOUT as well as to a file in the logs directory.  

### Viewing Events

Acorn apps generate events that can be either accessed from the shell or the dashboard.  

```shell
acorn events app/school
# RESOURCE     NAME                               TYPE            ACTOR           OBSERVED                               DESCRIPTION
# app/school   8e6e72ba72519e2df4620f4d6449074a   AppCreate       username   2023-10-17 21:13:43.65855 -0700 MST    App acorn/school created
# app/school   10299167e1181aab0496367b31aed7da   AppSpecUpdate   username   2023-10-17 21:23:27.405748 -0700 MST   Acorn definition updated acorn/school
# app/school   30c6918b98181444b824ac7572ccce99   AppSpecUpdate   username   2023-10-17 21:25:39.565005 -0700 MST   Acorn definition updated acorn/school
# app/school   d3b029835e180030a4bd23fbb0aecb31   AppSpecUpdate   username   2023-10-17 21:31:08.620699 -0700 MST   Acorn definition updated acorn/school
# app/school   954a1549d6180698d2ecdc84c6d47a92   AppSpecUpdate   username   2023-10-17 21:35:31.333494 -0700 MST   Acorn definition updated acorn/school
# app/school   59a5273e38184da84c2861a98481a0d3   AppSpecUpdate   username   2023-10-17 21:37:25.284371 -0700 MST   Acorn definition updated acorn/school
# app/school   7ac56f28b618468e189731c385b64a86   AppSpecUpdate   username   2023-10-17 21:39:15.413501 -0700 MST   Acorn definition updated acorn/school
# app/school   cca0ec7154e220e3110cf16f29abc5cc   AppSpecUpdate   username   2023-10-17 21:47:09.718696 -0700 MST   Acorn definition updated acorn/school
```

The events let you know who did what action and when. This is useful if you aren't sure who deployed the Acorn, or made a recent change.

### Shell Access

Let’s access the files written to the filesystem by accessing the shell of the container. We can do this with the below command:

```shell
acorn exec school  
```

Once within the shell, you can see the contents of the file api_logs.txt available under the logs directory.

You can run the commands within the container shell by passing them as parameters

acorn exec school /bin/sh -c 'cat logs/api_logs.txt'

## Exploring the Volumes and Secrets

### Volumes

As mentioned in the previous steps, the logs directory is a persistent volume attached to the application.  

You can list the volumes with the below command:

```shell
acorn volumes
# NAME                BOUND-VOLUME   CAPACITY   VOLUME-CLASS   STATUS    ACCESS-MODES   CREATED
# school.log-data     log-data       1Gi       ebs-retain     bound     RWO            30m ago
# school.db.db-data   db-data        1Gi       ebs-retain     bound     RWO            31m ago
```

The volume, log-data, is created because we explicitly mentioned it in the Acornfile with the below definition:

```acorn
...
volumes: {  
     "log-data": {}   
}
```

The db-data volume is created by the MariaDB Acorn Service to persist the data stored in the database.  

When we delete an Acorn, the volumes associated with it are retained by default. We will see how to delete the volumes in the cleanup section of this guide.  

An Acorn Service is designed to abstract the provisioning of the resources and injecting the credentials into the application consuming the service. Since the credentials and configuration is created dynamically, they can be accessed by the application at runtime without any knowledge.  

### Secrets

To explore the secrets generated by our Acorn Service, run the below command:

```shell
acorn secret
# NAME              TYPE      KEYS                  CREATED
# school.db.admin   basic     [password username]   38m ago
# school.db.user    basic     [password username]   38m ago  
```

Going back to the Acornfile, we injected the admin credentials into the application as environment variables.  

```acorn
containers: school: { 
    ...
    env: {
        "DB_NAME":"@{service.db.data.dbName}"
        "DB_USER": "@{service.db.secrets.user.username}"
        "DB_PASS": "@{service.db.secrets. user.password}"
        "DB_HOST": "@{service.db.address}"
    }
    ...
}
```

Let’s reveal the admin credentials and compare them with the environment variables available within the application container.  

```shell
acorn secret reveal school.db.admin
# NAME              TYPE      KEY        VALUE
# school.db.admin   basic     password   a^+GQpY!2Y+_m&4p
# school.db.admin   basic     username   root
```

Let’s check the environment variables to see if they are the same.  

```shell
acorn exec school /bin/sh -c 'echo $DB_USER;echo $DB_PASS'
# root
# a^+GQpY!2Y+_m&4p
```

The variables in the container match the values of the secrets.

## Using the Dev Mode to Interactively Debug the App

Acorn aims to be friendly to development and operations. In the day to day workflow, developers need to be able to attach debuggers, access databases, and make changes to the code.

### Port Forwarding

It is possible to forward the port of a service locally. We can then access the remote service with local clients which simplifies the debugging process.  

Let’s forward the port 3306 of MariaDB service available through school.db Acorn.

```shell
acorn port-forward school.db 3306
```

Assuming you have the MySQL client installed on the development machine, you can reveal the credentials of the root user and access the database instance.  

```shell
mysql -h 127.0.0.1 -u root  -p
```

In a different terminal window, reveal the secret and use that with MySQL client.  

```shell
acorn secrets reveal school.db.admin
# NAME              TYPE      KEY        VALUE
# school.db.admin   basic     password   a^+GQpY!2Y+_m&4p
# school.db.admin   basic     username   root
```

Once you are in the MySQL shell, you can access the database and run SQL commands.  

```shell
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| instance           |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
5 rows in set (0.23 sec)

mysql> use instance
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A
Database changed

mysql> select * from students;
+----+---------+------+
| id | name    | age  |
+----+---------+------+
|  1 | Alice   |   20 |
|  2 | Bob     |   22 |
|  3 | Charlie |   21 |
+----+---------+------+
3 rows in set (0.24 sec)

mysql> quit;
```

### Dev Mode

Acorn also provides a dev command that enables you to run your project in a live-reload mode, which automatically reloads your application whenever you make changes to your code.

You can launch an application in dev mode by running `acorn dev` or `acorn run -i` command. Every time the Acornfile or Dockerfiles are changed, the application is automatically built and redeployed. The logs are streamed to the console.  

It’s also possible to attach a dev session to a pre-existing Acorn. Let’s attach our application to the dev session.  

```shell
acorn dev -n school
```

Lets make a small change in the UI code to update the user prompt.

```html
<!-- Form for entering new student -->
        <div class="card">
            <div class="card-header">
                Enter New Student
            </div>
            ...
```

Change `Enter New Student` to `Enter New Student Information`.  

```html
<!-- Form for entering new student -->
        <div class="card">
            <div class="card-header">
                Enter New Student Information
            </div>
            ...
```

After saving the file, you will notice the file is synchronized to the container running the application and the server process is restarted. Now you can reload the UI and see the changes reflected.

When you are done editing and trying things, you can exit the dev mode by pressing Ctrl+C. You'll notice that the deployment goes back to the previous state, before you started the dev mode.

## Cleanup

Now that we have walked through the day to day of interacting with Acorns, the last step is to clean things up.

We can delete the application by running the below command:

```shell
acorn rm school
```

Acorn will say that the application has been deleted. This means the app and containers have been removed along with the `school.db` app and containers. The volumes and secrets are still retained as a safety precaution against accidental deletion.

Lets delete the secrets and volumes associated with the application.

First list secrets so we can know their names:

```shell
acorn secrets
# NAME                          TYPE       KEYS                  CREATED
# school.db.admin               basic      [password username]   23h ago
# school.db.user                basic      [password username]   23h ago
```

Then remove them:

```shell
acorn secrets rm school.db.admin school.db.user
# school.db.user
# school.db.admin
```

Now lets do the same thing for volumes:

``` shell
acorn volumes
NAME                BOUND-VOLUME   CAPACITY   VOLUME-CLASS   STATUS    ACCESS-MODES   CREATED
school.log-data     log-data       10Gi       ebs-retain     bound     RWO            70m ago
school.db.db-data   db-data        10Gi       ebs-retain     bound     RWO            70m ago
```

Now we can remove the volumes by name:

```shell
acorn volumes rm school.log-data
acorn volumes rm school.db.db-data
```

We walked through this process manually, but it is possible to delete everything with a single command:

```shell
acorn rm -af school
```

Caution should be used when deleting everything like this, there isn't a way to recover the data once it is deleted.

Now that everything is cleaned up, you are ready to work with Acorn in your day to day workflow.
