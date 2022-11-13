
const path = require('path');
const join = (pathname) => path.join(__dirname, '../', pathname);

const packageName = 'qiankunChild';

const configs = {
  mode: 'development',
  plugins: [],
  module: {
    rules: []
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.ts', '.tsx'],
  }
}
configs.entry = {
  main: join('src/main.tsx')
}

configs.output = {
  path: join('dist'),
  filename: '[name].js',
  library: `${packageName}-[name]`,
  libraryTarget: 'umd',
  chunkLoadingGlobal: `webpackJsonp_${packageName}`
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
});
configs.module.rules.push({
  test: /\.tsx?$/,
  exclude: /node_modules/,
  use: {
    loader: 'ts-loader',
    options: {
      silent: true,
    }
  },
});

module.exports = configs;
