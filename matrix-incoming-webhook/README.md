# [Matrix Incoming Webhook][url]

1. Go to [riot.im][riot] and sign up for an account
2. Create a new channel
3. Invite `@_webhook:t2bot.io` to your room, or your own webhook user
   if you're running your own matrix server and webhook bridge. See
   [the webhook bridge][webhook-bridge] docs. Wait for Webhook Bridge
   to join (it will no longer appear as "invited" in the sidebar).
   This may take a while, or you may need to run your own Matrix
   server and webhook bridge.
4. Send the message `!webhook` to your room
5. Wait a little while for Webhook Bridge to send you a message. Try
   sending `!webhook` again.
6. When you get a message, grab the token at the end of the URL and
   set the environment variable: `export WEBHOOK_TOKEN=<token>`

[url]: https://github.com/resources/snippets/tree/master/matrix-incoming-webhook
[riot]: https://riot.im/
[webhook-bridge]: https://github.com/turt2live/matrix-appservice-webhooks
``` js
const axios = require('axios');

class Client {
  constructor({token, displayName, avatarUrl}) {
    Object.assign(this, {token, displayName, avatarUrl});
  }

  async sendMessage(message) {
    await axios.post(`https://webhooks.t2bot.io/api/v1/matrix/hook/${this.token}`, {
      text: message,
      format: 'plain',
      displayName: this.displayName,
      avatarUrl: this.avatarUrl
    });
  }
}

async function start() {
  const client = new Client({
    token: process.env.WEBHOOK_TOKEN,
    displayName: 'example-bot',
    avatarUrl: 'https://robohash.org/example-bot'
  });
  await client.sendMessage('[matrix] rocks!');
}

start().catch(err => { console.error(err); });
```