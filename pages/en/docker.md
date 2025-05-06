# docker command

Manage Docker containers, images, networks, and volumes.

## Overview

Docker is a platform that uses containerization to package applications and their dependencies into isolated units. The `docker` command provides a CLI to build, run, and manage containers, images, networks, and volumes. It allows developers to create consistent environments across different machines.

## Options

### **--help**

Display help information for Docker commands.

```console
$ docker --help
Usage:  docker [OPTIONS] COMMAND

A self-sufficient runtime for containers

Common Commands:
  run         Create and run a new container from an image
  exec        Execute a command in a running container
  ps          List containers
  build       Build an image from a Dockerfile
  pull        Download an image from a registry
  push        Upload an image to a registry
  images      List images
  login       Log in to a registry
  logout      Log out from a registry
  search      Search Docker Hub for images
  version     Show the Docker version information
  info        Display system-wide information

Management Commands:
  builder     Manage builds
  buildx*     Docker Buildx (Docker Inc., v0.10.4)
  compose*    Docker Compose (Docker Inc., v2.17.2)
  container   Manage containers
  context     Manage contexts
  image       Manage images
  manifest    Manage Docker image manifests and manifest lists
  network     Manage networks
  plugin      Manage plugins
  system      Manage Docker
  trust       Manage trust on Docker images
  volume      Manage volumes

[...]
```

## Usage Examples

### Running a container

```console
$ docker run -d -p 80:80 --name webserver nginx
e5d40ecd5de98d0bff8f57c4d7f1e2f132b95b5bd4c42d8f4e9f659d3e3950cd
```

### Listing running containers

```console
$ docker ps
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS                               NAMES
e5d40ecd5de9   nginx     "/docker-entrypoint.…"   10 seconds ago   Up 9 seconds    0.0.0.0:80->80/tcp, :::80->80/tcp   webserver
```

### Building an image from a Dockerfile

```console
$ docker build -t myapp:1.0 .
[+] Building 10.5s (10/10) FINISHED
 => [internal] load build definition from Dockerfile                                                 0.1s
 => => transferring dockerfile: 215B                                                                0.0s
 => [internal] load .dockerignore                                                                    0.0s
 => => transferring context: 2B                                                                      0.0s
 => [internal] load metadata for docker.io/library/node:14                                           1.2s
 => [1/5] FROM docker.io/library/node:14@sha256:a158d3b9b4e3fa813fa6c8c590b8f0a860e015ad4e59bbce5744d5dc65798060  0.0s
 => [internal] load build context                                                                    0.0s
 => => transferring context: 32B                                                                     0.0s
 => CACHED [2/5] WORKDIR /app                                                                        0.0s
 => [3/5] COPY package*.json ./                                                                      0.1s
 => [4/5] RUN npm install                                                                            8.5s
 => [5/5] COPY . .                                                                                   0.1s
 => exporting to image                                                                               0.4s
 => => exporting layers                                                                              0.4s
 => => writing image sha256:d64d6b95f5b7e8c3e92a6c2f5f154610e2aa0163d3c1a9c832b80ed4d5a0e21e       0.0s
 => => naming to docker.io/library/myapp:1.0                                                         0.0s
```

### Stopping a container

```console
$ docker stop webserver
webserver
```

### Removing a container

```console
$ docker rm webserver
webserver
```

## Tips

### Use Docker Compose for Multi-Container Applications

For applications with multiple services, use Docker Compose with a `docker-compose.yml` file instead of managing each container separately with `docker run` commands.

### Clean Up Unused Resources

Use `docker system prune` to remove all stopped containers, unused networks, dangling images, and build cache. Add the `-a` flag to also remove all unused images.

### Use Named Volumes for Persistent Data

Instead of using bind mounts, use named volumes for data that needs to persist between container restarts: `docker run -v mydata:/app/data myapp`.

### Use Multi-Stage Builds

For smaller production images, use multi-stage builds in your Dockerfile to separate build dependencies from runtime dependencies.

## Frequently Asked Questions

#### Q1. What's the difference between `docker run` and `docker start`?
A. `docker run` creates and starts a new container from an image, while `docker start` restarts a stopped container that already exists.

#### Q2. How do I access a running container's shell?
A. Use `docker exec -it container_name /bin/bash` or `/bin/sh` to get an interactive shell inside a running container.

#### Q3. How do I view container logs?
A. Use `docker logs container_name` to view the logs of a container. Add `-f` to follow the log output in real-time.

#### Q4. How do I copy files between my host and a container?
A. Use `docker cp /host/path container_name:/container/path` to copy from host to container, or `docker cp container_name:/container/path /host/path` to copy from container to host.

#### Q5. How do I update a running container's configuration?
A. You can't update most configuration options of a running container. Instead, stop the container, remove it, and create a new one with the updated configuration.

## References

https://docs.docker.com/engine/reference/commandline/docker/

## Revisions

- 2025/05/05 First revision