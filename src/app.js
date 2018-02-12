import console from 'console';
import ParseServerConfig from 'parse-server/lib/Config';
import {
  Client as LineBotClient,
  middleware as lineBotMiddleware,
} from '@line/bot-sdk';
import bodyParser from 'body-parser';
import createHandlers from './handlers';

const { Parse } = global;

let lineBotMiddlewareFunc;
let handlers;

const initDatabase = async database => {
  const schema = await database.loadSchema();

  await schema.enforceClassExists('LineBotUser');
};

const initPromise = (async () => {
  try {
    const { database } = ParseServerConfig.get(
      Parse.CoreManager.get('APPLICATION_ID'),
    );
    await initDatabase(database);

    const globalConfigs = await database.find(
      '_GlobalConfig',
      { objectId: '1' },
      { limit: 1 },
    );
    const env = globalConfigs[0].params;

    // create LINE SDK config from env variables
    const config = {
      channelAccessToken: env.LINE_BOT_CHANNEL_ACCESS_TOKEN,
      channelSecret: env.LINE_BOT_CHANNEL_SECRET,
    };

    // create LINE SDK client
    const client = new LineBotClient(config);

    if (__DEV__) {
      client.replyMessage = async (replyToken, message) => {
        console.log('replyMessage', replyToken, message);
      };
    }

    lineBotMiddlewareFunc = __DEV__
      ? bodyParser.json()
      : lineBotMiddleware(config);
    handlers = createHandlers({ database, client });
  } catch (e) {
    console.error(e);
  }
})();

// express app is prepared by Back4App
const { app } = global;

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post(
  '/callback',
  async (req, res, next) => {
    await initPromise;
    lineBotMiddlewareFunc(req, res, next);
  },
  (req, res) => {
    Promise.all(req.body.events.map(handlers.event))
      .then(result => res.json(result))
      .catch(err => {
        console.error(err?.originalError?.response?.data);
        console.error(err);
        res.status(500).end();
      });
  },
);

Parse.Cloud.define('push', async (req, res) => {
  await initPromise;
  try {
    res.success(await handlers.push(req.params));
  } catch (err) {
    console.error(err?.originalError?.response?.data);
    console.error(err);
    res.error();
  }
});
