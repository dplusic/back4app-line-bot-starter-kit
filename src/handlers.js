import { partition } from './utils';

export default ({ database, client }) => ({
  // event handler
  event: async event => {
    const id =
      event.source.groupId || event.source.roomId || event.source.userId;
    try {
      await database.create('LineBotUser', { objectId: id });
    } catch (e) {
      if (e.code === 137) {
        // message: 'A duplicate value for a field with unique values was provided'
      } else {
        throw e;
      }
    }

    if (event.type !== 'message' || event.message.type !== 'text') {
      // ignore non-text-message event
      return Promise.resolve(null);
    }

    // create a echoing text message
    const echo = { type: 'text', text: event.message.text };

    // use reply API
    return client.replyMessage(event.replyToken, echo);
  },

  push: async ({ message }) => {
    const users = await database.find('LineBotUser', {});
    const ids = users.map(x => x.objectId);
    const userIds = ids.filter(x => x.startsWith('U'));
    const groupOrRoomIds = ids.filter(
      x => x.startsWith('C') || x.startsWith('R'),
    );

    const messages = [{ type: 'text', text: message }];

    await Promise.all([
      ...userIds::partition(150).map(x => client.multicast(x, messages)),
      ...groupOrRoomIds.map(id => client.pushMessage(id, messages)),
    ]);

    return true;
  },
});
