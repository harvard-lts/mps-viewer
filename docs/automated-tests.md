# Automated tests

The automated tests are organized by test type.
* **Unit tests** are tests that are isolated to the component that the tests are running in and do not require any external dependencies
* **Integration tests** are tests that require external components such as APIs or databases

The package.json file has commands for running unit tests and integration tests individually.

```
  "test:unit": "./node_modules/.bin/jest --testPathPattern=__tests__/unit",
  "test:integration": "./node_modules/.bin/jest --testPathPattern=__tests__/integration"
```

## Unit tests

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

### Creating unit tests

Unit tests can be created to call the API routes of the component internally with jest and supertest.

Review the node template [example unit tests](https://github.huit.harvard.edu/LTS/node-ci-template/blob/main/__tests__/unit/api.test.js).

## Integration tests

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

## All tests

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