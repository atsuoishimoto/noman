# docker run command

Creates and starts a new container from an image.

## Overview

`docker run` creates and runs a new container from a specified Docker image. It combines the functionality of `docker create` and `docker start` in a single command. This command is fundamental for launching containers with various configurations, network settings, volume mounts, and runtime parameters.

## Options

### **--name**

Assign a name to the container

```console
$ docker run --name my-nginx nginx
```

### **-d, --detach**

Run container in background and print container ID

```console
$ docker run -d nginx
7cb5d2b9a7eab87f07182b5bf58936c9947890995b1b94f412912fa822a9ecb5
```

### **-p, --publish**

Publish a container's port(s) to the host

```console
$ docker run -p 8080:80 nginx
```

### **-v, --volume**

Bind mount a volume

```console
$ docker run -v /host/path:/container/path nginx
```

### **-e, --env**

Set environment variables

```console
$ docker run -e MYSQL_ROOT_PASSWORD=my-secret-pw mysql
```

### **--rm**

Automatically remove the container when it exits

```console
$ docker run --rm alpine echo "Hello, World!"
Hello, World!
```

### **-i, --interactive**

Keep STDIN open even if not attached

```console
$ docker run -i ubuntu
```

### **-t, --tty**

Allocate a pseudo-TTY

```console
$ docker run -it ubuntu bash
root@7cb5d2b9a7ea:/#
```

### **--network**

Connect a container to a network

```console
$ docker run --network=my-network nginx
```

### **--restart**

Restart policy to apply when a container exits

```console
$ docker run --restart=always nginx
```

## Usage Examples

### Running a web server with port mapping

```console
$ docker run -d --name my-website -p 8080:80 nginx
7cb5d2b9a7eab87f07182b5bf58936c9947890995b1b94f412912fa822a9ecb5
```

### Running an interactive shell in a container

```console
$ docker run -it --rm ubuntu bash
root@7cb5d2b9a7ea:/# ls
bin  boot  dev  etc  home  lib  lib32  lib64  libx32  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
root@7cb5d2b9a7ea:/# exit
```

### Running a container with environment variables and volume mounts

```console
$ docker run -d \
  --name my-database \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -v pgdata:/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:13
```

## Tips:

### Use --rm for Temporary Containers

When running containers for one-off tasks or testing, use the `--rm` flag to automatically clean up the container after it exits, preventing container clutter.

### Combine -i and -t for Interactive Sessions

The `-it` combination is commonly used when you need an interactive terminal session with the container, such as running a shell.

### Use Named Volumes for Persistent Data

Instead of binding to host directories, consider using named volumes (`-v myvolume:/container/path`) for better portability and management of persistent data.

### Limit Container Resources

Use `--memory` and `--cpus` flags to limit the resources a container can use, preventing a single container from consuming all host resources.

```console
$ docker run --memory=512m --cpus=0.5 nginx
```

## Frequently Asked Questions

#### Q1. What's the difference between `docker run` and `docker start`?
A. `docker run` creates and starts a new container from an image, while `docker start` restarts a stopped container that already exists.

#### Q2. How do I run a container in the background?
A. Use the `-d` or `--detach` flag to run the container in the background.

#### Q3. How can I access a service running in a container?
A. Use the `-p` or `--publish` flag to map container ports to host ports, e.g., `-p 8080:80` maps container port 80 to host port 8080.

#### Q4. How do I pass environment variables to a container?
A. Use the `-e` or `--env` flag followed by the variable name and value, e.g., `-e VARIABLE=value`.

#### Q5. How do I share files between my host and a container?
A. Use the `-v` or `--volume` flag to mount host directories or volumes into the container, e.g., `-v /host/path:/container/path`.

## References

https://docs.docker.com/engine/reference/commandline/run/

## Revisions

- 2025/05/05 First revision