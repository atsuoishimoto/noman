# docker-compose command

Define and run multi-container Docker applications.

## Overview

Docker Compose is a tool for defining and running multi-container Docker applications. With a YAML file, you configure your application's services, networks, and volumes, then create and start all services with a single command. It simplifies the process of managing complex applications that require multiple interconnected containers.

## Options

### **up**

Create and start containers defined in the compose file

```console
$ docker-compose up
Creating network "myapp_default" with the default driver
Creating myapp_db_1    ... done
Creating myapp_redis_1 ... done
Creating myapp_web_1   ... done
Attaching to myapp_db_1, myapp_redis_1, myapp_web_1
```

### **-d, --detach**

Run containers in the background

```console
$ docker-compose up -d
Creating network "myapp_default" with the default driver
Creating myapp_db_1    ... done
Creating myapp_redis_1 ... done
Creating myapp_web_1   ... done
```

### **down**

Stop and remove containers, networks, images, and volumes

```console
$ docker-compose down
Stopping myapp_web_1   ... done
Stopping myapp_redis_1 ... done
Stopping myapp_db_1    ... done
Removing myapp_web_1   ... done
Removing myapp_redis_1 ... done
Removing myapp_db_1    ... done
Removing network myapp_default
```

### **ps**

List containers

```console
$ docker-compose ps
     Name                    Command               State           Ports         
--------------------------------------------------------------------------------
myapp_db_1      docker-entrypoint.sh mysqld      Up      3306/tcp, 33060/tcp
myapp_redis_1   docker-entrypoint.sh redis ...   Up      6379/tcp              
myapp_web_1     docker-entrypoint.sh npm start   Up      0.0.0.0:3000->3000/tcp
```

### **logs**

View output from containers

```console
$ docker-compose logs
Attaching to myapp_web_1, myapp_redis_1, myapp_db_1
web_1    | > myapp@1.0.0 start
web_1    | > node server.js
web_1    | Server listening on port 3000
db_1     | 2023-05-05T12:34:56.789Z 0 [Note] mysqld: ready for connections.
```

### **-f, --follow**

Follow log output (with logs command)

```console
$ docker-compose logs -f
Attaching to myapp_web_1, myapp_redis_1, myapp_db_1
web_1    | > myapp@1.0.0 start
web_1    | > node server.js
web_1    | Server listening on port 3000
```

### **build**

Build or rebuild services

```console
$ docker-compose build
Building web
Step 1/10 : FROM node:14
 ---> 1234567890ab
Step 2/10 : WORKDIR /app
 ---> Using cache
 ---> abcdef123456
...
Successfully built 0123456789ab
Successfully tagged myapp_web:latest
```

### **exec**

Execute a command in a running container

```console
$ docker-compose exec web npm test
> myapp@1.0.0 test
> jest

PASS  ./app.test.js
  ✓ should return 200 (32ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
```

### **-f, --file**

Specify an alternate compose file

```console
$ docker-compose -f docker-compose.prod.yml up -d
Creating network "myapp_default" with the default driver
Creating myapp_db_1    ... done
Creating myapp_redis_1 ... done
Creating myapp_web_1   ... done
```

## Usage Examples

### Starting a development environment

```console
$ docker-compose up
Creating network "myapp_default" with the default driver
Creating myapp_db_1    ... done
Creating myapp_redis_1 ... done
Creating myapp_web_1   ... done
Attaching to myapp_db_1, myapp_redis_1, myapp_web_1
```

### Rebuilding and starting services

```console
$ docker-compose up --build
Building web
Step 1/10 : FROM node:14
...
Successfully built 0123456789ab
Successfully tagged myapp_web:latest
Creating network "myapp_default" with the default driver
Creating myapp_db_1    ... done
Creating myapp_redis_1 ... done
Creating myapp_web_1   ... done
```

### Running a one-off command in a service container

```console
$ docker-compose run web npm install express
Creating myapp_web_run ... done
+ express@4.18.2
added 57 packages in 2.5s
```

### Scaling a service

```console
$ docker-compose up -d --scale web=3
Creating myapp_web_1 ... done
Creating myapp_web_2 ... done
Creating myapp_web_3 ... done
```

## Tips:

### Use Environment Variables

Store sensitive information like passwords and API keys in a `.env` file instead of hardcoding them in your compose file.

```console
$ cat .env
DB_PASSWORD=secretpassword
API_KEY=1234567890abcdef
```

### Override Default Compose File

Create a `docker-compose.override.yml` file for development-specific settings that will automatically be used alongside the base `docker-compose.yml` file.

### Use Named Volumes for Persistence

Named volumes preserve data between container restarts and rebuilds:

```yaml
volumes:
  db_data:

services:
  db:
    image: postgres
    volumes:
      - db_data:/var/lib/postgresql/data
```

### Use Version Control for Compose Files

Keep your compose files in version control to track changes and collaborate with team members.

## Frequently Asked Questions

#### Q1. What's the difference between `docker-compose up` and `docker-compose run`?
A. `up` starts all services defined in the compose file, while `run` starts a specific service and runs a one-off command.

#### Q2. How do I update a single service?
A. Use `docker-compose up --build <service_name>` to rebuild and update a specific service.

#### Q3. How can I view logs for a specific service?
A. Use `docker-compose logs <service_name>` to view logs for a specific service.

#### Q4. How do I stop services without removing containers?
A. Use `docker-compose stop` to stop services without removing containers, networks, or volumes.

#### Q5. How can I run docker-compose in production?
A. While docker-compose can be used in production, Docker Swarm or Kubernetes are often better choices for production deployments. If using compose, create a production-specific compose file with appropriate settings.

## References

https://docs.docker.com/compose/reference/

## Revisions

- 2025/05/05 First revision