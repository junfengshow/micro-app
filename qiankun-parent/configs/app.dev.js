const webpack = require('webpack');
const configs = require('./webpack.config');
const compiler = webpack(configs);
const WebpackServer = require('webpack-dev-server');

const listener = new WebpackServer({
  port: 8888,
}, compiler);

listener.start()
.then(() => {
  console.log('server is running at 8888');
})