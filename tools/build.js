import console from 'console';
import util from 'util';
import webpack from 'webpack';
import webpackConfig from './webpack.config';

(async () => {
  try {
    const stats = await util.promisify(webpack)(webpackConfig);
    console.info(stats.toString());
  } catch (e) {
    console.error(e);
  }
})();
