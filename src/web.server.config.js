const path = require('path');
const webpack = require('webpack');


module.exports = {
  entry: { server: './server.ts' },
  resolve: { extensions: ['.js', '.ts' ] },
  target: 'node',
  mode: 'none',
  // this makes sure we include node_modules and other 3rd party libraries
  externals: [/(node_modules|main\..*\.js)/],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  modules: {
    rules: [
      { tests: /\.ts$/, loader: 'ts-loader'}
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, 'src'), // locations for your src
      {} // a map ofyour routes
    ),
    new webpack.ContextReplacementPlugin(
      /(.+)?express(\\|\/)core(.+)?/,
      path.join(__dirname, 'src'),
      {}
    )
  ]
};
