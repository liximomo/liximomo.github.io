var webpack = require('webpack');

module.exports = {
  entry: {
    'index': ["./src/index.js"],
    'post': ["./src/post.js"]
  },
  output: {
    path: __dirname,
    filename: "[name].js",
    publicPath: '/js/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }, 
      { 
        test: /\.css$/, loader: "style!css" 
      }
    ]
  }
};
