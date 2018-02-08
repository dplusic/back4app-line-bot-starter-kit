import console from 'console';
import util from 'util';
import webpack from 'webpack';
import webpackConfig from './webpack.config';

export default async () => {
  const stats = await util.promisify(webpack)(webpackConfig);
  console.info(stats.toString(webpackConfig.stats));
};
