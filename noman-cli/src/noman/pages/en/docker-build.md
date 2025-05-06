# docker build command

Build an image from a Dockerfile.

## Overview

The `docker build` command builds Docker images from a Dockerfile and a "context". The context is the set of files located in the specified PATH or URL. The build process can refer to any of the files in the context. The Dockerfile contains instructions that Docker uses to create a new image.

## Options

### **-t, --tag**

Tag the built image with a name and optionally a tag in the 'name:tag' format.

```console
$ docker build -t myapp:1.0 .
[+] Building 10.5s (10/10) FINISHED
 => [internal] load build definition from Dockerfile                       0.1s
 => => transferring dockerfile: 215B                                       0.0s
 => [internal] load .dockerignore                                          0.0s
 => => transferring context: 2B                                            0.0s
 => [internal] load metadata for docker.io/library/node:14                 1.2s
 => [1/5] FROM docker.io/library/node:14@sha256:fcb6...                    0.0s
 => [internal] load build context                                          0.0s
 => => transferring context: 32B                                           0.0s
 => CACHED [2/5] WORKDIR /app                                              0.0s
 => [3/5] COPY package*.json ./                                            0.1s
 => [4/5] RUN npm install                                                  8.5s
 => [5/5] COPY . .                                                         0.1s
 => exporting to image                                                     0.5s
 => => exporting layers                                                    0.4s
 => => writing image sha256:a72d...                                        0.0s
 => => naming to docker.io/library/myapp:1.0                               0.0s
```

### **-f, --file**

Specify the name of the Dockerfile (default is 'PATH/Dockerfile').

```console
$ docker build -f Dockerfile.prod -t myapp:prod .
[+] Building 12.3s (10/10) FINISHED
 => [internal] load build definition from Dockerfile.prod                  0.1s
 => => transferring dockerfile: 256B                                       0.0s
...
```

### **--no-cache**

Do not use cache when building the image.

```console
$ docker build --no-cache -t myapp .
[+] Building 25.7s (10/10) FINISHED
 => [internal] load build definition from Dockerfile                       0.1s
...
```

### **--pull**

Always attempt to pull a newer version of the image.

```console
$ docker build --pull -t myapp .
[+] Building 15.2s (10/10) FINISHED
 => [internal] load build definition from Dockerfile                       0.1s
 => [internal] load .dockerignore                                          0.0s
 => [internal] load metadata for docker.io/library/node:14                 1.5s
 => [1/5] FROM docker.io/library/node:14@sha256:fcb6... DONE              10.2s
...
```

### **--build-arg**

Set build-time variables defined in the Dockerfile with ARG instructions.

```console
$ docker build --build-arg NODE_ENV=production -t myapp .
[+] Building 11.8s (10/10) FINISHED
 => [internal] load build definition from Dockerfile                       0.1s
...
```

### **--target**

Set the target build stage to build when using multi-stage builds.

```console
$ docker build --target development -t myapp:dev .
[+] Building 8.3s (8/8) FINISHED
 => [internal] load build definition from Dockerfile                       0.1s
 => [internal] load .dockerignore                                          0.0s
 => [internal] load metadata for docker.io/library/node:14                 1.2s
 => [1/5] FROM docker.io/library/node:14@sha256:fcb6...                    0.0s
 => [2/5] WORKDIR /app                                                     0.1s
 => [3/5] COPY package*.json ./                                            0.1s
 => [4/5] RUN npm install                                                  6.5s
 => exporting to image                                                     0.3s
...
```

## Usage Examples

### Building an image with a tag

```console
$ docker build -t myapp:latest .
[+] Building 15.2s (10/10) FINISHED
...
```

### Building with multiple tags

```console
$ docker build -t myapp:latest -t myapp:1.0 -t registry.example.com/myapp:1.0 .
[+] Building 14.7s (10/10) FINISHED
...
=> => naming to docker.io/library/myapp:latest                             0.0s
=> => naming to docker.io/library/myapp:1.0                                0.0s
=> => naming to registry.example.com/myapp:1.0                             0.0s
```

### Building from a specific Dockerfile and context

```console
$ docker build -f ./docker/Dockerfile.prod -t myapp:prod ./app
[+] Building 18.3s (10/10) FINISHED
...
```

### Building with build arguments

```console
$ docker build --build-arg VERSION=1.0.0 --build-arg ENV=staging -t myapp:staging .
[+] Building 16.5s (10/10) FINISHED
...
```

## Tips

### Use .dockerignore Files

Create a `.dockerignore` file to exclude files and directories from the build context. This reduces build time and size by preventing unnecessary files from being sent to the Docker daemon.

### Leverage Build Cache

Docker caches intermediate layers. Order your Dockerfile instructions to maximize cache usage - put instructions that change frequently (like copying source code) after instructions that change less frequently (like installing dependencies).

### Multi-stage Builds

Use multi-stage builds to create smaller production images. The first stage can include build tools and dependencies, while the final stage contains only what's needed to run the application.

```dockerfile
FROM node:14 AS build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
```

### Minimize Layer Count

Combine related commands in a single RUN instruction using `&&` to reduce the number of layers in your image.

## Frequently Asked Questions

#### Q1. What's the difference between `docker build` and `docker image build`?
A. They are the same command. `docker image build` is the more explicit form, but `docker build` is more commonly used.

#### Q2. How do I build an image from a remote Git repository?
A. Use `docker build` with a Git URL: `docker build https://github.com/username/repo.git#branch:folder`

#### Q3. How can I reduce the size of my Docker images?
A. Use multi-stage builds, smaller base images (like Alpine), clean up in the same layer where you install packages, and use `.dockerignore` to exclude unnecessary files.

#### Q4. How do I specify which stage to build in a multi-stage Dockerfile?
A. Use the `--target` flag: `docker build --target stage-name -t myimage .`

#### Q5. Can I build ARM images on an x86 machine?
A. Yes, use the `--platform` flag: `docker build --platform linux/arm64 -t myimage .` (requires Docker BuildKit)

## References

https://docs.docker.com/engine/reference/commandline/build/

## Revisions

- 2025/05/05 First revision