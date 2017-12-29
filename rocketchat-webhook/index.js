// [RocketChat webhook][url]
// 
// 1. Run `yarn init -y` and `yarn add micro`
// 2. Log into Rocket.Chat, go to the Administration Panel, and choose
//    Integrations
// 3. Select "New Integration", and then "Outgoing Webhook"
// 4. Select "Message Sent" for the Event Trigger
// 5. Set "Enabled" to true and give it a name (like "testing123")
// 6. Enter a channel name ("#general") and a trigger word (like "testing123")
// 7. Enter a URL, which is the server you'll deploy to and a path:
//    Example: `https://rocketchat-testing123.now.sh/`
// 8. Several fields down is the Token. It will contain an automatically
//    generated one. Copy that and set it as the `WEBHOOK_TOKEN` environment
//    variable:
//     ``` bash
//     export WEBHOOK_TOKEN=oWgqqKpcFC6vSzkCMipBAETF
//     ```
// 9. Click `Save Changes`. Deploy the app or expose it via ngrok and run it:
//     ``` bash
//     # https://zeit.co/now deployment
//     now -e WEBHOOK_TOKEN=$WEBHOOK_TOKEN
//     export DEPLOYMENT_URL=$(pbpaste)
//     now alias $DEPLOYMENT_URL rocketchat-testing123.now.sh
// 
//     # for ngrok, open a new console tab and run ngrok
//     # When ngrok provides the URL, copy and paste the URL and update the
//     # webhook in the RocketChat admin
//     ngrok http 3000
// 
//     # And the original tab run the micro server
//     yarn start
//     ```
// 10. Go to the channel and send a message starting with the trigger text.
// 
// [url]: https://github.com/resources/snippets/tree/master/rocketchat-webhook
const {json, send} = require('micro')

if (! process.env.WEBHOOK_TOKEN) {
  throw new Error('The WEBHOOK_TOKEN environment variable must be set.')
}

module.exports = async (req, res) => {
  const data = await json(req)
  if (data.token !== process.env.WEBHOOK_TOKEN) {
    return send(res, 401, { error: 'Invalid Token' })
  }
  const message = data.text.replace(data.trigger_word, '').trimLeft()
  return { text: `You said: ${message}` }
}