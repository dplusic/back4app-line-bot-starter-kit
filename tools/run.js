import console from 'console';

(async () => {
  try {
    if (process.argv.length < 3) {
      return;
    }

    const taskName = process.argv[2];

    const task = require(`./${taskName}`).default; // eslint-disable-line global-require, import/no-dynamic-require
    await task(...process.argv.slice(3));
  } catch (e) {
    console.error(e);
  }
})();
