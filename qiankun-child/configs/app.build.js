const webpack = require('webpack');
const configs = require('./webpack.config');
const compiler = webpack(configs);

compiler.run((err) => {
  if (err) {
    return;
  }
});