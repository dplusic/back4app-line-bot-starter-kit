import console from 'console';
import path from 'path';
import util from 'util';
import rimraf from 'rimraf';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';

export default async () => {
  const outputPath = path.join(__dirname, 'build');

  await util.promisify(rimraf)(outputPath);

  webpackConfig.entry = ['./tools/start/server.js', 'webpack/hot/poll?1000'];
  webpackConfig.output = {
    path: outputPath,
    filename: 'app.js',
  };
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  );

  const { definitions } = webpackConfig.plugins.find(
    x => x instanceof webpack.DefinePlugin,
  );
  definitions.__DEV__ = true; // eslint-disable-line no-underscore-dangle

  let lastHash;

  webpack(webpackConfig).watch({}, (err, stats) => {
    if (err) {
      throw err;
    }

    if (stats.hash !== lastHash) {
      lastHash = stats.hash;

      console.info(stats.toString(webpackConfig.stats));
    }

    require('./build/app.js'); // eslint-disable-line global-require, import/no-unresolved
  });
};
