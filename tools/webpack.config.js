import path from 'path';
import nodeExternals from 'webpack-node-externals';
import pkg from '../package.json';

export default {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, '../CloudCode/cloud'),
    filename: 'app.js',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  externals: [
    nodeExternals({ nodeModules: Object.keys(pkg.optionalDependencies) }),
  ],
  stats: {
    cached: false,
    cachedAssets: false,
    colors: true,
  },
  plugins: [],
};
