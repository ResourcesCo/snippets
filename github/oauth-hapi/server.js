// https://resources.co/snippets/github/oauth-hapi
// 
// - `npm init -y`
// - `npm install hapi@16 bell --save`
// - generate a session key:
//     `export SESSION_KEY=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")`
// - Go to github.com > Settings > Developer Settings > OAuth Apps and add a new app
// 
'use strict';

const Hapi = require('hapi');
const Bell = require('bell');

const server = Hapi.server({
  port: process.env.PORT || 3000
});

async function start() {
  await server.register(Bell);

  server.auth.strategy('github', 'bell', {
    provider: 'github',
    scope: ['user:email'],
    password: process.env.GITHUB_AUTH_COOKIE_KEY,
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.SESSION_KEY
  });

  //server.route({
  //method: ['GET', 'POST']
  //})

  await server.start();
}

start().then(() => {
  console.log(`Server running at: ${server.info.uri}`);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
// References:
// - 
// - 