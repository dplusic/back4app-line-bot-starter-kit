import express from 'express';
import { ParseServer } from 'parse-server';

const port = process.env.PORT || 3000;

const parseServerDatabaseURI = process.env.PARSE_SERVER_DATABASE_URI;
if (!parseServerDatabaseURI) {
  process.stderr.write('PARSE_SERVER_DATABASE_URI is not set.\n');
  process.exit(1);
}

const app = express();

const parseServer = new ParseServer({
  serverURL: `http://localhost:${port}`,
  databaseURI: parseServerDatabaseURI,
  appId: 'myAppId',
  masterKey: 'myMasterKey',
});

global.app = app;

require('../src/app');

app.use('/', parseServer);

app.listen(port);
