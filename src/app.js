import ParseServerConfig from 'parse-server/lib/Config';

const { Parse } = global;

const { database } = ParseServerConfig.get(
  Parse.CoreManager.get('APPLICATION_ID'),
);

// express app is prepared by Back4App
const { app } = global;

app.get('/', async (req, res) => {
  const results = await database.find(
    '_GlobalConfig',
    { objectId: '1' },
    { limit: 1 },
  );
  res.send(JSON.stringify(results));
});

// A simple function
// https://docs.back4app.com/docs/integrations/command-line-interface/a-simple-function/
Parse.Cloud.define('hello', (req, res) => {
  res.success('Hello world!');
});
