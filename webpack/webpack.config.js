const path = require('path');
const eta = require('eta');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// TODO: HOW DO I USE THESE THINGS???
// https://webpack.js.org/loaders/html-loader/#export-into-html-files
// https://webpack.js.org/concepts/loaders/#configuration


module.exports = {
  mode: 'development',
  entry: {
    'mirador.js': './src/mirador.js',
    'index.js': './views/index.eta',
  },
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
      },
      {
        test: /\.eta$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              preprocessor(content, loaderContext) {
                return eta.render(content, {}, { filename: loaderContext.resourcePath });
              },
            }
          },
          /*{
            loader: 'extract-loader',
          },*/
        ]
      },
    ]
  },  
  output: {
    filename: '[name]',
    path: path.resolve('.', 'public', 'js', 'dist'),
    publicPath: '/js/dist/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.IgnorePlugin({
      resourceRegExp: /@blueprintjs\/(core|icons)/, // ignore optional UI framework dependencies
    }),
  ],
  /*optimization: {
    minimize: false
  },*/
};
