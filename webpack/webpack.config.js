const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');

const idsExamples = [
  {
    "href": "example.html?manifest=https://iiif.lib.harvard.edu/manifests/ids:10274486",
    "text": "Harvard University Baseball Team, photograph, 1892"
  },
  {
    "href": "example.html?manifest=https://iiif.lib.harvard.edu/manifests/ids:10274484",
    "text": "Harvard-Yale Baseball Game. Holmes Field, photograph, 1885"
  },
  {
    "href": "example.html?manifest=https://iiif.lib.harvard.edu/manifests/ids:47723272",
    "text": "To roast a chicken; show #217"
  },
  {
    "href": "example.html?manifest=https://iiif.lib.harvard.edu/manifests/ids:42929359",
    "text": "Untitled Drumset"
  },
  {
    "href": "example.html?manifest=https://iiif.lib.harvard.edu/manifests/drs:4997399",
    "text": "Hot Dog In The Manger"
  },
  {
    "href": "example.html?manifest=https://iiif.lib.harvard.edu/manifests/drs:48309543",
    "text": "Chronique du monde depuis la création, et des rois de France et d'Angleterre, jusqu'à l'an 1461: manuscript, [ca. 1461]. MS Typ 41. Houghton Library, Harvard University, Cambridge, Mass."
  },
  {
    "href": "example.html?manifest=https://iiif.lib.harvard.edu/manifests/drs:5981093",
    "text": "Heures de Nôtre Dame (use of Troyes and Sens) : manuscript, [ca. 1470]"
  }
];

const mpsExamples = [
  {
    "href": "example.html?manifest=https://mps.lib.harvard.edu/iiif/2/URN-3:DIV.LIB.USC:3200357",
    "text": "Harvard Divinity School Unitarian Service Committee",
    "version": 2
  },
  {
    "href": "example.html?manifest=https://mps.lib.harvard.edu/iiif/3/URN-3:DIV.LIB.USC:3200357",
    "text": "Harvard Divinity School Unitarian Service Committee",
    "version": 3
  },
  {
    "href": "example.html?manifest=https://mps.lib.harvard.edu/iiif/2/URN-3:FHCL:42632611",
    "text": "Harvard Yenching Fushun Xian zhi 37 juan",
    "version": 2
  },
  {
    "href": "example.html?manifest=https://mps.lib.harvard.edu/iiif/3/URN-3:FHCL:42632611",
    "text": "Harvard Yenching Fushun Xian zhi 37 juan",
    "version": 3
  },
  {
    "href": "example.html?manifest=https://mps.lib.harvard.edu/iiif/2/URN-3:FHCL:100001249",
    "text": "Tibetan Buddhist Resource Center",
    "version": 2
  },
  {
    "href": "example.html?manifest=https://mps.lib.harvard.edu/iiif/3/URN-3:FHCL:100001249",
    "text": "Tibetan Buddhist Resource Center",
    "version": 3
  }
];

module.exports = {
  mode: 'development',
  entry: './src/mirador.js',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      }
    ]
  },  
  output: {
    filename: 'mirador.js',
    path: path.resolve('.', 'public', 'js', 'dist'),
    publicPath: '/js/dist/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.IgnorePlugin({
      resourceRegExp: /@blueprintjs\/(core|icons)/, // ignore optional UI framework dependencies
    }),
    new HtmlBundlerPlugin({
      entry: {
        index: { // output public/gh-pages/index.html
          import: './views/index.eta',
          data: {
            title: 'Welcome to the MPS Viewer!',
            idsExamples: idsExamples,
            mpsExamples: mpsExamples
          },
        },
      },
      outputPath: path.resolve('.', 'public', 'gh-pages'),
    }),
  ],
  resolve: {
    alias: {
      'react/jsx-runtime': 'react/jsx-runtime.js',
      'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
   }
 },
  /*optimization: {
    minimize: false
  },*/
};