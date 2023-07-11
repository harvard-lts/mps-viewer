# Tips and tricks for developing Mirador plugins

## Mirador 3, pre and post React 17

Mirador support for React 17, 18 and beyond might bring about some big changes in plugin development. In particular the major version of bump of [Material UI](https://mui.com/material-ui/getting-started/overview/) in Mirador will need to trickle down into plugins. Until Mirador adds that support, we should continue to use [legacy Material UI components](https://v4.mui.com/system/basics/).

Additionally there are certain things we should avoid in our work today due to known issues/obsolescence:

| Avoid | Reason | Prefer |
| --- | --- | --- |
| [NWB](https://github.com/insin/nwb) | NWB isn't actively maintained, it requires an old version of node in order to work and might have compatibility issues with React Testing Library. It seems like Mirador will be moving away from this eventually | ~[Parcel](https://github.com/parcel-bundler/parcel)~, [vite](https://github.com/vitejs/vite), [Webpack](https://github.com/webpack/webpack) (community consensus TBD) |
| [Enzyme](https://github.com/enzymejs/enzyme) | Enzyme isn't actively maintained, and doesn't support React versions newer than 16. Mirador has already begun moving away from this | [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) |
| [Parcel](https://github.com/parcel-bundler/parcel) | Occasionally seemed to create errors during the course of development and made progress more difficult | [Webpack](https://github.com/webpack/webpack) and [Rollup](https://rollupjs.org) |


## Suggested workflow for Mirador plugins

1. Create a repository for the plugin
2. Create a feature branch named corresponding to the Jira ticket
3. Follow the [PDIIIF plugin as an example](https://github.com/harvard-lts/mirador-pdiiif-plugin), taking all of it's config. You should be able to modify its `package.json` file and swap its metadata (`name`, `description`, `version`, `repository`, and `dependencies`) for your own.  
4. Make sure you have an `src/index.js`, which exports your plugin as an array in the default export
5. Work on your code locally using the [recommended local development strategy](#run-the-plugin-using-webpack-dev-server-recommended)
6. When your code is ready for review, follow the standard procedure for code reviews and PR's 
7. **After** the PR is merged, see the section on publishing to NPM
8. Create a PR for mps-viewer which updates the package.json to include your plugin at the correct version number (make sure to run `npm i` in the container to update the `package-lock.json`, too).
9. Add the plugin to the list of [Custom Harvard Mirador Plugins](./custom-harvard-mirador-plugins.md)

## Local development

Working in Docker comes with the unfortunate drawback that using `npm link` to substitute a dependency for a local one doesn't really work as well. There may be better ways to do this, but in the meantime here's some suggestions for developing and debugging your code locally.

### Run the plugin using Webpack dev-server (recommended)

This solution will allow you to develop the plugin against a stock version of Mirador. It grants you full access to the React and Redux dev tools, and will auto-compile and reload the browser window when the `src` files are updated.

If your plugin is using the [suggested workflow](#suggested-workflow-for-mirador-plugins), then you can run the dev server by running `npm run serve`.

### Shimming into Mirador (not recommended)

Shimming a plugin into Mirador will allow you to have full access to React and Redux devtools and can help to debug your code. The process looks something like this:

1. [Checkout Mirador](https://github.com/ProjectMirador/mirador)
2. Place your plugin in the `plugins` directory
3. Edit `__tests__/integration/mirador/index.html` to have whatever config you like (e.g. pointing it at an MPS manifest). Also edit it to pass an empty array (`[]`) after the config. E.g. `Mirador.viewer({...}, [])`
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


### Shimming into MPS Viewer (not recommended)

It's a bit more straightforward to shim a plugin into MPS, the steps are something like:

1. Create a new folder in the `plugins` directory and add your plugin code here
2. Import your plugin to `src/mirador.js` and include it in the plugins array


## Publishing to NPM
### Setup

If your package doesn't exist on NPM yet, you'll need to [publish it manually](https://docs.npmjs.com/packages-and-modules). Afterwards publishing should be left to CI.

Publishing to NPM is handled by a Github Actions workflow. In order to use the workflow you'll need:

1. To follow [the suggested workflow](#suggested-workflow-for-mirador-plugins)
2. An [NPM granular access token](https://docs.npmjs.com/about-access-tokens#about-granular-access-tokens), which provides granular *read/write* access to the package on [npmjs.com](https://npmjs.com/packages-and-modules). This must be stored in a secret in the repository named `NPM_ACCESS_TOKEN`.
3. A [Github Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) that provides granular *read/write* access to the "_contents_" on this repository. This must be stored in a secret in the repository named `ACCESS_TOKEN`.

### Publishing via Github

Draft a new release in the Github UI and create a tag for the version number that you'd like to publish to NPM. Do this for the `main` branch (after the feature has been merged). When the action completes the version published to NPM will match the tag used when creating the release.  

In the unlikely event the action fails, you'll probably want to delete the release and the tag (in that order), debug the errors and then try again.


## Troubleshooting

Some problem scenarios that have been observed before along with possible solutions:

<table>
    <thead>
        <tr>
            <th>Problem</th>
            <th>Possible solutions</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>The action to publish to NPM when creating a release fails</td>
            <td>
                <ul>
                    <li>Make sure the appropriate secrets are set and that the access tokens have the correct permissions and haven't expired.</li>
                    <li>Check `/actions` in Github for more details to help debug the issue</li>
                </ul>
            </td>
        </tr>    
        <tr>
            <td>Shimming the plug-in works, but including it via `node_modules` throws an error. Parcel appears to produce a bundle which doesn't include one or more of the imports correctly</td>
            <td>
                <ul>
                    <li>Make sure that all the dependencies are installed (using `npm install` if any new were added) in the plugin repo.</li>
                    <li>Try running `npm update parcel` in the plugin repo</li>
                    <li>Switch to using Rollup and Webpack, following the [PDIIIF plugin as a guide](https://github.com/harvard-lts/mirador-pdiiif-plugin)</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

## Useful resources


### Official docs

- [M3 Creating a Mirador plugin](https://github.com/ProjectMirador/mirador/wiki/M3---Creating-a-Mirador-plugin)
- [Mirador 3 plugins](https://github.com/ProjectMirador/mirador/wiki/Mirador-3-plugins) (which is fuller but easier to miss)
- [Mirador FAQ](https://github.com/ProjectMirador/mirador/wiki/M3---Mirador-3-Frequently-Asked-Questions) contains some useful code snippets

Exploring the Mirador source code is another great way to get familiar with how things work!

### Unofficial docs

- [WIP plugin dev tutorial](https://github.com/jbaiter/mirador3-plugin-dev-tutorial) by Johannes Baiter, which is maybe a little bit out of date at this point, but does go into more detail and is definitely worth reading.
- [Plugin authoring notes](https://gist.github.com/jabrah/690560c3edbc8f01fb7ef5f3008964db) and [adding a new view](https://gist.github.com/jabrah/97fb049cfc2b4229739233641c4a8a32) are two gists by John Abrahams that contain extra notes on what is required.
- [Mirador awesome](https://github.com/ProjectMirador/mirador-awesome) is a list of plugins and implementations that you might find useful as a reference for how other people have done things.

### Existing harvard plugins

We've created some plugins that do various things. Here are some you might find useful along with what techniques each leverages:

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
                <li>Shows tooling without NWB, using Rollup + Webpack</li>
                <li>Shows tests written using React Testing Library</li>
            </ul>
        </td>            
    </tr>    
</table>

### Extra reading

You can probably get a long way with the above, and by re-working other plugins to suit your needs. If you're curious and still want to learn more, here are some of the more important and useful topics that will help:

1. [Redux reducers](https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#writing-reducers)
2. [Redux selectors](https://redux.js.org/usage/deriving-data-selectors#calculating-derived-data-with-selectors)
3. [Redux sagas](https://redux-saga.js.org/docs/introduction/GettingStarted/)
4. [The container pattern](https://www.thegreatcodeadventure.com/the-react-plus-redux-container-pattern/)