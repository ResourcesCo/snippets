# [GitLab OAuth with Hapi v16]tps://github.com/resources/snippets/tree/master/gitlab-oauth-with-hapi-v16)

- `npm init -y`
- `npm install hapi@16 hapi-auth-cookie@7 bell@8 --save`
- generate a session key:
    `export SESSION_KEY=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")`
- Log into a GitLab account
  - To create your own GitLab server, here is [a walkthrough]tps://github.com/resources/walkthroughs/blob/master/gitlab.md)
  - Or create an account on GitLab.com
- Go to Settings > Applications and add a new app (use the read_user permissions if just using for hentication)
    - use `https://yourdomain.example.com/auth/gitlab` as your redirect URI
- set the application ID: `export GITLAB_APPLICATION_ID=YOUR_APPLICATION_ID`
- set the secret: `export GITLAB_SECRET=YOUR_SECRET`
- set the URI of your gitlab: `export GITLAB_URI=https://gitlab.example.com` (use `https://gitlab.com` using gitlab.com)
- test with ngrok:
  - run `npm start`
  - in a new console tab, run `brew cask install ngrok`
  - run `ngrok http 3000`
  - set the callback URL to https://yourngrokurl.ngrok.io/auth/gitlab on the OAuth app page
  - open https://yourngrokurl.ngrok.io/ in your browser
- deploy with now:
  - set up https://zeit.co/now if you haven't already
  - run `now`:
          now -e SESSION_KEY=$SESSION_KEY \
              -e GITLAB_APPLICATION_ID=$GITLAB_APPLICATION_ID \
              -e GITLAB_SECRET=$GITLAB_SECRET \
              -e GITLAB_URI=$GITLAB_URI
  - run `now alias set https://auto-generated-subdomain.now.sh your-now-subdomain`
  - update the callback URL to https://your-now-subdomain.now.sh/auth/gitlab on the GitLab OAuth app page
  - open https://your-now-subdomain.now.sh/ in your browser
``` js
'use strict';

const Hapi = require('hapi');
const HapiAuthCookie = require('hapi-auth-cookie');
const Bell = require('bell');

const server = new Hapi.Server();

server.connection({port: process.env.PORT || 3000});

async function start() {
  await server.register(HapiAuthCookie);
  await server.register(Bell);

  server.auth.strategy('session', 'cookie', {
    password: process.env.SESSION_KEY,
    redirectTo: '/',
  });

  server.auth.strategy('gitlab', 'bell', {
    provider: 'gitlab',
    scope: ['read_user'],
    password: process.env.SESSION_KEY,
    config: {
      uri: process.env.GITLAB_URI
    },
    clientId: process.env.GITLAB_APPLICATION_ID,
    clientSecret: process.env.GITLAB_SECRET,
    forceHttps: true,  // needed to use ngrok when testing locally
  });

  server.route({
    method: 'GET',
    path: '/',
    config: {
      auth: {strategy: 'session', mode: 'try'},
      plugins: {'hapi-auth-cookie': {redirectTo: false}},
      handler: (request, reply) => {
        if (request.auth.credentials) {
          const {username, email} = request.auth.credentials;
          reply(`<pre>${JSON.stringify({username, email}, null, 2)}</pre>
                 <p>Go to <a href="/secret">/secret</a> to see a protected page!</p>`);
        } else {
          reply('Go to <a href="/auth/gitlab">/auth/gitlab</a> to sign in!');
        }
      }
    }
  });

  server.route({
    method: ['GET', 'POST'],
    path: '/auth/gitlab',
    config: {
      auth: 'gitlab',
      handler: (request, reply) => {
        if (! request.auth.isAuthenticated) {
          return reply(`Auth failed: ${request.auth.error.message}`);
        }

        const {username, email} = request.auth.credentials.profile;
        request.cookieAuth.set({username, email});

        return reply.redirect('/');
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/secret',
    config: {
      auth: 'session',
      handler: (request, reply) => {
        reply('You should only see this when logged in.');
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/logout',
    handler: (request, reply) => {
      request.cookieAuth.clear();
      reply.redirect('/');
    }
  });

  await server.start();
}

start().then(() => {
  console.log(`Server running at: ${server.info.uri}`);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
```