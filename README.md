# MPS Viewer
The viewer microservice for Multimedia Presentation Service (MPS)

After following the setup instructions and starting your Docker container, you should have a running NodeJS application with two routes:

* A "Hello, World" HTML page here: https://localhost:23017/
* A Health Check page here: https://localhost:23017/healthcheck

## Technology Stack
##### Language
NodeJS
Mirador

##### Framework
Express

##### Development Operations
Docker Compose

## Table of Contents
* [Local Development Environment Setup Instructions](#local-development-environment-setup-instructions)
* [Automated tests](docs/automated-tests.md)
    * [Unit tests](docs/automated-tests.md#unit-tests)
    * [Creating unit tests](docs/automated-tests.md#creating-unit-tests)
    * [Integration tests](docs/automated-tests.md#integration-tests)
    * [All tests](docs/automated-tests.md#all-tests)
* [Tips and tricks for developing Mirador plugins](docs/developing-mirador-plugins.md)
    * [Mirador 3, pre and post React 17](docs/developing-mirador-plugins.md#mirador-3-pre-and-post-react-17)
    * [Suggested workflow for Mirador plugins](docs/developing-mirador-plugins.md#suggested-workflow-for-mirador-plugins)
    * [Local development](docs/developing-mirador-plugins.md#local-development)
    * [Shimming into Mirador](docs/developing-mirador-plugins.md#shimming-into-mirador)
    * [Shimming into MPS Viewer](docs/developing-mirador-plugins.md#shimming-into-mps-viewer)
    * [Useful resources](docs/developing-mirador-plugins.md#useful-resources)
        * [Official docs](docs/developing-mirador-plugins.md#official-docs)
        * [Unofficial docs](docs/developing-mirador-plugins.md#unofficial-docs)
        * [Existing harvard plugins](docs/developing-mirador-plugins.md#existing-harvard-plugins)
        * [Extra reading](docs/developing-mirador-plugins.md#extra-reading)
* [List of Custom Harvard Mirador Plugins](docs/custom-harvard-mirador-plugins.md)        

## Local Development Environment Setup Instructions

### 1: Clone the repository to a local directory
```git clone git@github.huit.harvard.edu:LTS/mps-viewer.git```

### 2: Create app config

##### Create config file for environment variables
- Make a copy of the config example file `./env-example.txt`
- Rename the file to `.env`
- Replace placeholder values as necessary

*Note: The config file .env is specifically excluded in .gitignore and .dockerignore, since it contains credentials it should NOT ever be committed to any repository.*

### 3: Create example items

##### Create config file for environment variables
- Make a copy of the example items example file `./config/example-items-example.txt`
- Rename the file to `example-items.json`
- Replace placeholder values as necessary

*Note: The config file .example-items.json is specifically excluded in .gitignore and .dockerignore, since the examples will differ from environment to environment.*

### 4: Start

##### START

This command builds all images and runs all containers specified in the docker-compose-local.yml configuration.

```
docker-compose -f docker-compose-local.yml up -d --build --force-recreate
```

### 5: SSH into Container (optional)

##### Run docker exec to execute a shell in the container by name

Open a shell using the exec command to access the mps-viewer container.

```
docker exec -it mps-viewer bash
```

### 6: Stop

##### STOP AND REMOVE

This command stops and removes all containers specified in the docker-compose-local.yml configuration. This command can be used in place of the 'stop' and 'rm' commands.

```
docker-compose -f docker-compose-local.yml down
```
