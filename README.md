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


## Tips and tricks for developing Mirador plugins


### Mirador 3, pre and post React 17

Mirador support for React 17, 18 and beyond might bring about some big changes in plugin development. In particular the major version of bump of [Material UI](https://mui.com/material-ui/getting-started/overview/) in Mirador will need to trickle down into plugins. Until Mirador adds that support, we should continue to use [legacy Material UI components](https://v4.mui.com/system/basics/).

Additionally there are certain things we should avoid in our work today due to known issues/obsolecence:

| Avoid | Reason | Prefer |
| --- | --- | --- |
| [NWB](https://github.com/insin/nwb) | NWB isn't actively maintained, it requires an old version of node in order to work and might have compatibility issues with React Testing Library. It seems like Mirador will be moving away from this eventually | [Parcel](https://github.com/parcel-bundler/parcel), [vite](https://github.com/vitejs/vite), [webpack](https://github.com/webpack/webpack) (community consensus TBD) |
| [Enzyme](https://github.com/enzymejs/enzyme) | Enzyme isn't actively maintained, and doesn't support React versions newer than 16. Mirador has already begun moving away from this | [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) |


### Suggested workflow for Mirador plugins

1. Make new branch in mps-viewer named corresponding to the Jira ticket
2. Begin by shimming the plugin into MPS viewer or Mirador
3. Once you're happy with the results, create an empty repo for the plugin
4. Create a branch on the plugin repo named with the corresponding Jira ticket and migrate your plugin code here and write tests if possible (This step will ensure your code be reviewed more easily, as you'll be able to make a PR)
5. Publish the plugin to npm on the `@harvard-lts` organization
6. Update MPS Viewer to install and include the npm module proper
7. Create two PR's, one for mps-viewer, the other for the plugin. Have testing instructions in one of these PR's and have them reference each other


### Local development

Working in Docker comes with the unfortunate drawback that using `npm link` to substitute a dependency for a local one doesn't really work as well. There may be better ways to do this, but in the meantime here's some suggestions for developing and debugging your code locally.


#### Shimming into Mirador

Shimming a plugin into Mirador will allow you to have full access to React and Redux devtools and can help to debug your code. The process looks something like this:

1. [Checkout Mirador](https://github.com/ProjectMirador/mirador)
2. Place your plugin in the `plugins` directory
3. Edit `__tests/integration/mirador/index.html` to have whatever config you like (e.g. pointing it at an MPS manifest). Also edit it to pass an empty array (`[]`) after the config. E.g. `Mirador.viewer({...}, [])`
4. Edit `src/init.js`, importing your plugin at the top, and setting the plugins to an array containing your plugin. E.g:
   ```
   import MiradorViewer from './lib/MiradorViewer';
   import MyPlugin from './plugins/MyPlugin';

   /**
   * Default Mirador instantiation
   */
   function viewer(config, pluginsOrStruct) {
   let struct;

   if (Array.isArray(pluginsOrStruct)) {
       struct = { plugins: [MyPlugin]};
   } else {
       struct = pluginsOrStruct;
   }

   return new MiradorViewer(config, struct);
   }

   export default {
   viewer,
   };
   ```
5. Run `npm run start` to get the local dev server running


#### Shimming into MPS Viewer

It's a bit more straightforward to shim a plugin into MPS, the steps are something like:

1. Create a new folder in the plugins directory and add your plugin code here
2. Import your plugin to `src/mirador.js` and include it in the plugins array


### Useful resources


#### Official docs

- [M3 Creating a Mirador plugin](https://github.com/ProjectMirador/mirador/wiki/M3---Creating-a-Mirador-plugin)
- [Mirador 3 plugins](https://github.com/ProjectMirador/mirador/wiki/Mirador-3-plugins) (which is fuller but easier to miss)

Exploring the Mirador source code is another great way to get familiar with how things work!

#### Unofficial docs

There's a also a [WIP plugin dev tutorial](https://github.com/jbaiter/mirador3-plugin-dev-tutorial) outside of the official docs, which is maybe a little bit out of date at this point, but does go into more detail and is definitely worth reading.

#### Existing harvard plugins

We've created some plugins that do various things, here's some you might find useful along with what techniques each leverages:

<table>
    <tr>
        <th>What it is</th>
        <th>Things it does</th>
    </tr>
    <tr>
        <td><a href="https://github.com/harvard-lts/mirador-help-plugin">Help plugin</a></td>
        <td>
            <ul>
                <li>Uses <code>mapDispatchToProps</code> and a custom reducer to open and close a modal</li>
                <li>Uses <code>mapStateToProps</code> to access data in the Redux store</li>
                <li>Uses various components from Material UI</li>
                <li>Adds custom CSS using the <code>withStyles</code> HoC</li>
                <li>Adds a menu item to the plugin menu</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><a href="https://github.com/harvard-lts/mirador-url-sync-plugin">URL sync plugin</a></td>
        <td>
            <ul>
                <li>Uses saga generator functions to listen to events coming from Mirador's Redux store</li>
                <li>Uses the <code>select</code> saga method to pull in more data from the store inside the generator (similar to <code>mapStateToProps</code>)</li>
                <li>Uses the <code>put</code> saga method to dispatch an action to the Redux store (similar to <code>mapDispatchToProps</code>)</li>
                <li>Demonstrates how to create a plugin with no UI</li>
            </ul>
        </td>            
    </tr>
    <tr>
        <td><a href="https://github.com/harvard-lts/mirador-pdiiif-plugin">PDIIIF plugin</a></td>
        <td>
            <ul>
                <li>Shows tooling without NWB (Parcel, for now)</li>
                <li>Shows tests written using React Testing Library</li>
            </ul>
        </td>            
    </tr>    
</table>


#### Extra reading

You can probably get a long way with the above, and by re-working other plugins to suit your needs. If you're curious and still want to learn more, here are some of the more important and useful topics that will help:

1. [Redux reducers](https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#writing-reducers)
2. [Redux selectors](https://redux.js.org/usage/deriving-data-selectors#calculating-derived-data-with-selectors)
3. [Redux sagas](https://redux-saga.js.org/docs/introduction/GettingStarted/)
4. [The container pattern](https://www.thegreatcodeadventure.com/the-react-plus-redux-container-pattern/)
