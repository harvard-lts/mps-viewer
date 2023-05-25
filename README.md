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

## Automated tests

The automated tests are organized by test type.
* **Unit tests** are tests that are isolated to the component that the tests are running in and do not require any external dependencies
* **Integration tests** are tests that require external components such as APIs or databases

The package.json file has commands for running unit tests and integration tests individually.

```
  "test:unit": "./node_modules/.bin/jest --testPathPattern=__tests__/unit",
  "test:integration": "./node_modules/.bin/jest --testPathPattern=__tests__/integration"
```

### Unit tests

Unit tests test the individual component without any external dependencies on other components.

Run unit tests

Open a shell inside the container

```
docker exec -it node-ci-template bash
```

Run the unit tests with the `npm run test:unit` command

```
npm run test:unit
```

#### Creating unit tests

Unit tests can be created to call the API routes of the component internally with jest and supertest.

Review the node template [example unit tests](https://github.huit.harvard.edu/LTS/node-ci-template/blob/main/__tests__/unit/api.test.js).

### Integration tests

Integration tests require additional components to be running with preset data in place to return the expected test results. Build and run these components locally or update the configuration to connect to the server urls.

Setup the additional components on the same docker network to run integration tests.

Open a shell inside the container

```
docker exec -it node-ci-templates bash
```

Run the integration tests with the `npm run test:integration` command

```
npm run test:integration
```

### All tests

The package.json file has commands for running all tests.

```
  "test": "./node_modules/.bin/jest",
  "test:watch": "./node_modules/.bin/jest --watchAll",
```

To run all tests run the npm test command.

```
npm test
```

To run all tests in watchAll mode run the npm test command.

```
npm run test:watch
```
