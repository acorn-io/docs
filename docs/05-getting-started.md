---
title: Getting Started
---

## Overview

In this getting started guide, we will explore how to deploy a simple Python application that uses an RDS database backend. We will use the Acorn CLI to deploy our application onto the platform.

At the end of this getting started we will have:

* Install the Acorn CLI and sign up for an account
* Create a simple Python application
* Deploy our application to the Acorn platform
* Explore the Acorn UI

## Concepts

A few key concepts to cover before getting into the guide.

### Acornfile

Just as a Dockerfile describes how to build a single application container, an Acornfile describes how to deploy your Dockerized applications. Acornfiles describe the containers, jobs, arguments, secrets, and volumes needed to deploy your application. Also, developers can describe cloud services that their application needs like databases, queues, and buckets. These services can also be provisioned by Acorn without the developer needing to know how to use Terraform or CloudFormation.

### Acorn Images

In addition to being a platform for deploying applications, Acorn also has its own OCI packaging format. This artifact contains all of the configurations along with the Docker images needed to run the application. The package is easily built in a CI pipeline with the `acorn build` command. The resulting image can then be pushed to any container registry and deployed to the Acorn platform.

## Prerequisites

You will need a GitHub account to signup for the Acorn platform.

## Install Acorn CLI

To get started with the Acorn CLI follow the instructions for your OS, and then log in to create an account.

### MacOS & Linux

To install the Acorn CLI on MacOS or Linux, run the following command in your terminal.

```bash
brew install acorn-io/cli/acorn
```

For Linux-based systems, if you do not have Homebrew installed, you can also download the binary from this URL:

* [https://cdn.acrn.io/cli/default_linux_amd64_v1/acorn](https://cdn.acrn.io/cli/default_linux_amd64_v1/acorn)

Next, make the binary executable and move it to your path. Once, you have done this you can run the `acorn` command from your terminal to login.

### Windows

For Windows systems, you can download the CLI from this URL:

* [https://cdn.acrn.io/cli/default_windows_amd64_v1/acorn.exe](https://cdn.acrn.io/cli/default_windows_amd64_v1/acorn.exe)

Then, make the binary executable and move it to your path. Once, you have done this you can run the `acorn` command from your terminal to login.

## Acorn Login

Once you have followed the installation of the CLI for your OS, you can login to the Acorn platform.

```bash
acorn login
```

This will open up a browser window where you can create an account with your GitHub account. Once you have created an account you can close the browser window and return to the terminal.

## Deploy our App

### Step 1: Create our Python Application

We will start by creating a simple Python Flask application that talks to a MySQL database backend. The app we will use is a simple todo list.

First, let's create our directories and application files.

```bash
mkdir -p my-todo/templates
cd my-todo
touch app.py requirements.txt templates/template.html Dockerfile Acornfile
```

Next, add the following code to the `app.py` file using your favorite editor.

```python
import os
from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import URL


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = URL.create(
    drivername="mysql+pymysql",
    username=os.environ["DB_USER"],
    password=os.environ["DB_PASS"],
    host=os.environ["DB_HOST"],
    port=os.environ["DB_PORT"],
    database=os.environ["DB_NAME"],
)

db = SQLAlchemy(app)


class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    done = db.Column(db.Boolean)


@app.route("/")
def home():
    todo_list = Todo.query.all()
    return render_template("template.html", todo_list=todo_list)


@app.route("/add", methods=["POST"])
def add():
    title = request.form.get("title")
    new_todo = Todo(title=title, done=False)
    db.session.add(new_todo)
    db.session.commit()
    return redirect(url_for("home"))


@app.route("/update/<int:todo_id>")
def update(todo_id):
    todo = Todo.query.filter_by(id=todo_id).first()
    todo.done = not todo.done
    db.session.commit()
    return redirect(url_for("home"))


@app.route("/delete/<int:todo_id>")
def delete(todo_id):
    todo = Todo.query.filter_by(id=todo_id).first()
    db.session.delete(todo)
    db.session.commit()
    return redirect(url_for("home"))


with app.app_context():
    db.create_all()
```

Save the file. The file above uses a template page and talks to a backend database to get a list of todo entries. The connection information for the database is read from environment variables. We will set these environment variables when we create our Acornfile in the next section.

Now let's fill in that template file by adding the following code to `templates/template.html` to provide our page with some structure.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo App</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css">
    <script src="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.js"></script>
</head>

<body>
    <div style="margin-top: 50px;" class="ui container">
        <h1 class="ui center aligned header">To Do App</h1>

        <form class="ui form" action="/add" method="post">
            <div class="field">
                <label>Todo Title</label>
                <input type="text" name="title" placeholder="Enter Todo..."><br>
            </div>
            <button class="ui blue button" type="submit">Add</button>
        </form>

        <hr>

        <div class="ui items">
            {% for todo in todo_list %}
            <div class="item">
                <a href="/update/{{ todo.id }}">
                    {% if todo.done == False %}
                    <i class="large square outline icon"></i>
                    {% else %}
                    <i class="large green check square icon"></i>
                    {% endif %}
                </a>
                <div class="middle aligned content">
                    <div class="header">{{ todo.title }}</div>
                </div>
                <a href="/delete/{{ todo.id }}">
                    <i class="red trash alternate icon"></i>
                </a>
            </div>
            {% endfor %}
        </div>
    </div>
</body>

</html>
```

Next, add the following lines to the `requirements.txt` file.

```text
Flask==2.3.2
flask_sqlalchemy
pymysql
```

The above lines will install the dependencies we need to run our application. The installation will be scripted in our Dockerfile and run during the build process.

### Step 2: Set up our Dockerfile

Now we need a Dockerfile to package our application. Fill in the file called `Dockerfile` with the following contents.

```docker
FROM python:latest

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

ENV FLASK_APP app.py
ENV FLASK_RUN_HOST 0.0.0.0
ENV FLASK_RUN_PORT 8000

EXPOSE 8000
ENTRYPOINT ["flask", "run"]
```

The above Dockerfile will install the dependencies, configure the default environment variables, and run our application.

### Step 3: Set up our Acornfile

Our Acornfile will be used to tie together the services, Docker build, and deployment information for our application.  During the Acorn build all of the Docker containers will be built or pulled from a registry and packaged into the Acorn image.

Fill in the file called `Acornfile` with the following contents.

```acorn
services: db: image: "ghcr.io/acorn-io/mariadb:v1.#.#"

containers: app: {
        build: context: "."
        consumes: [ "db"]
        ports: publish: "8000/http"
        env: {
                DB_HOST: "@{service.db.address}"
                DB_PORT: "@{service.db.port.3306}"
                DB_NAME: "@{service.db.data.dbName}"
                DB_USER: "@{service.db.secrets.admin.username}"
                DB_PASS: "@{service.db.secrets.admin.password}"
        }
        if args.dev {
                dirs: "/app":     "./"
                env: FLASK_DEBUG: "1"
        }
}
```

In the file above, the `services` section is defining a service named `db` that will be used to provision and provide connection information for our application.

The `app` container will consume the service information via `@{service.db.xxx}` variables. In our case, the service will provide all of the database connection information we need for the application to be able to read/write the todo entries.

### Step 4: Deploy our application

Now that we have our application and Acornfile created, we can deploy our application. To do this, we will use the Acorn CLI. We will build and run the app in a single step, for production deployments you will want to build the image and push it to a registry.

From the same folder as your Acornfile, run the following command.

```bash
acorn run -n my-todo .
```

Now the application will start and when the app is ready, it will show you a URL to reach the application endpoint. You can also get the URL endpoint by running:

```shell
acorn ps
```

Which will show the running applications and their endpoints.
