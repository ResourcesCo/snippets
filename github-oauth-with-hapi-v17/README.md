# [GitHub OAuth with Hapi v17]tps://github.com/resources/snippets/tree/master/github-oauth-with-hapi-v16)

- `npm init -y`
- `npm install hapi hapi-auth-cookie github:makeomatic/bell#hapi17 --save`
- generate a session key:
    `export SESSION_KEY=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")`
- go to github.com > Settings > Developer Settings > OAuth Apps and add a new app
  - you can use your personal web page for the application URL and a temporary callback URL
  - you can change the callback URL later
- set the client ID: `export GITHUB_CLIENT_ID=YOUR_CLIENT_ID`
- set the client secret: `export GITHUB_CLIENT_SECRET=YOUR_CLIENT_SECRET`
- test with ngrok:
  - run `npm start`
  - in a new console tab, run `brew cask install ngrok`
  - run `ngrok http 3000`
  - set the callback URL to https://yourngrokurl.ngrok.io/auth/github on the GitHub OAuth app page
  - open https://yourngrokurl.ngrok.io/ in your browser
- deploy with now:
  - set up https://zeit.co/now if you haven't already
  - run `now`:
          now -e SESSION_KEY=$SESSION_KEY \
              -e GITHUB_CLIENT_ID=$GITHUB_CLIENT_ID \
              -e GITHUB_CLIENT_SECRET=$GITHUB_CLIENT_SECRET
  - run `now alias set https://auto-generated-subdomain.now.sh your-now-subdomain`
  - update the callback URL to https://your-now-subdomain.now.sh/auth/github on the GitHub OAuth app page
  - open https://your-now-subdomain.now.sh/ in your browser

``` js
'use strict';

const Hapi = require('hapi');
const HapiAuthCookie = require('hapi-auth-cookie');
const Bell = require('bell');

async function start() {
  const server = Hapi.server({
    port: process.env.PORT || 3000
  });

  await server.register(HapiAuthCookie);
  await server.register(Bell);

  server.auth.strategy('session', 'cookie', {
    password: process.env.SESSION_KEY,
    redirectTo: '/',
  });

  server.auth.strategy('github', 'bell', {
    provider: 'github',
    scope: ['user:email'],
    password: process.env.SESSION_KEY,
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    forceHttps: true,  // needed to use ngrok when testing locally
  });

  server.route({
    method: 'GET',
    path: '/',
    config: {
      auth: {strategy: 'session', mode: 'try'},
      plugins: {'hapi-auth-cookie': {redirectTo: false}},
      handler: (request, h) => {
        if (request.auth.credentials) {
          const {username, email} = request.auth.credentials;
          return `<pre>${JSON.stringify({username, email}, null, 2)}</pre>
                  <p>Go to <a href="/secret">/secret</a> to see a protected page!</p>`;
        } else {
          return 'Go to <a href="/auth/github">/auth/github</a> to sign in!';
        }
      }
    }
  });

  server.route({
    method: ['GET', 'POST'],
    path: '/auth/github',
    config: {
      auth: 'github',
      handler: async (request, h) => {
        if (! request.auth.isAuthenticated) {
          return `Auth failed: ${request.auth.error.message}`;
        }

        const {username, email} = request.auth.credentials.profile;
        request.cookieAuth.set({username, email});

        return h.redirect('/');
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/secret',
    config: {
      auth: 'session',
      handler: (request, h) => {
        return 'You should only see this when logged in.';
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/logout',
    handler: (request, h) => {
      request.cookieAuth.clear();
      return h.redirect('/');
    }
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

start().catch(err => {
  console.error(err);
  process.exit(1);
});
```