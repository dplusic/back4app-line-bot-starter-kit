import nodeExternals from 'webpack-node-externals';
import pkg from '../package.json';

export default {
  entry: './src/app.js',
  output: {
    filename: './CloudCode/cloud/app.js',
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
};
