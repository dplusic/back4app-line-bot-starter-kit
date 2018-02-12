import _ from 'underscore';

// eslint-disable-next-line import/prefer-default-export
export function partition(size) {
  return _.chain(this)
    .groupBy((e, i) => Math.floor(i / size))
    .values()
    .value();
}
