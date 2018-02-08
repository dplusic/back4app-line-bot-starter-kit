import express from 'express';
import { ParseServer } from 'parse-server';

const port = process.env.PORT || 3000;

const parseServerDatabaseURI = process.env.PARSE_SERVER_DATABASE_URI;
if (!parseServerDatabaseURI) {
  process.stderr.write('PARSE_SERVER_DATABASE_URI is not set.\n');
  process.exit(1);
}

const server = express();

let app;

server.use((req, res, next) => {
  app(req, res, next);
});

server.use(
  new ParseServer({
    serverURL: `http://localhost:${port}`,
    databaseURI: parseServerDatabaseURI,
    appId: 'myAppId',
    masterKey: 'myMasterKey',
  }),
);

const loadApp = () => {
  app = express();
  global.app = app;
  require('../../src/app'); // eslint-disable-line global-require
};

loadApp();

server.listen(port);

if (module.hot) {
  module.hot.accept('../../src/app', loadApp);
}
