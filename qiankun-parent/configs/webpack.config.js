
const path = require('path');
const join = (pathname) => path.join(__dirname, '../', pathname);

const configs = {
  mode: 'development',
  plugins: [],
  module: {
    rules: []
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  }
}
configs.entry = {
  main: join('src/main.js')
}

configs.output = {
  path: join('dist'),
  filename: '[name].js'
}

const HtmlWebpackPlugin = require('html-webpack-plugin');
configs.plugins.push(new HtmlWebpackPlugin({
  template: join('src/index.html')
}));

configs.module.rules.push({
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-react', '@babel/preset-env']
    }
  }
})

module.exports = configs;
