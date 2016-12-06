var webpack = require('webpack');
var path = require('path');

var PROD = process.env.NODE_ENV === 'production';

var plugins = [
  new webpack.DefinePlugin({
    IS_PRODUCTION: PROD
  })
];

if (PROD) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    output: {
      comments: false,
      semicolons: true
    },
    sourceMap: true
  }));
}

module.exports = {
  context: __dirname + '/app',
  entry: './index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.js.map'
  },
  devtool: "#source-map",
  plugins: plugins,
  module: {
    loaders: [
      // Import lodash into the global space, for angular-google-maps. :(
      { test: /\.js/, loader: 'imports?_=lodash' },
      { test: /\.html$/, loader: 'raw', exclude: /node_modules/ },

      { test: /\.css$/, loader: 'style!css' },
      { test: /\.scss$/, loader: 'style!css!sass', exclude: /node_modules/ },
      { test: /\.(png|jpg)$/, loader: 'url?limit=10485', exclude: /node_modules/ },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },

      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
    ]
  }
};
