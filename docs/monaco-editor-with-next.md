# Monaco Editor with Next.js

[![live demo](https://img.shields.io/badge/live-demo-green.svg?style=plastic)](https://resourcessnippets-next.now.sh/monaco)

This uses [@timkendrick/monaco-editor](https://github.com/timkendrick/monaco-editor)
which has support for the combination of WebPack and a node-like browser environment
(that has global variables like `process` and `module` defined).

## Create the project and add the dependencies

Create a next app:

``` bash
create-next-app myapp
```

Install the dependencies:

``` bash
npm install react-monaco-editor @timkendrick/monaco-editor express @zeit/next-css css-loader --save
```

## Add the component

[components/code-with-monaco.js](https://github.com/resources/snippets/blob/master/apps/next/components/code-with-monaco.js)

``` jsx
window.MonacoEnvironment = { baseUrl: '/monaco-editor-external' };
import * as monaco from '@timkendrick/monaco-editor/dist/external'
import React, { Component } from 'react'
import MonacoEditor from 'react-monaco-editor'
import '../node_modules/@timkendrick/monaco-editor/dist/external/monaco.css'

export default (props) => (
  <MonacoEditor
    width={500}
    height={200}
    language="javascript"
    theme="vs-dark"
    value=""
    options={{selectOnLineNumbers: true}}
    onChange={() => null}
    editorDidMount={() => null}
    {...props}
  />
)
```

## Set up the CSS loader for webpack

[next.config.js](https://github.com/resources/snippets/blob/master/apps/next/next.config.js)

``` js
const withCSS = require('@zeit/next-css')
module.exports = withCSS({
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }

    return config
  }
})
```

## Set up a custom server with a static middleware for Monaco Editor

[server.js](https://github.com/resources/snippets/blob/master/apps/next/server.js)

``` js
const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.use(
    '/monaco-editor-external',
    express.static(`${__dirname}/node_modules/@timkendrick/monaco-editor/dist/external`)
  )

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
```

Change the `scripts` in `package.json` to use the custom server:

[package.json](https://github.com/resources/snippets/blob/master/apps/next/package.json)

``` json
{
  "dev": "node server.js",
  "build": "next build",
  "start": "NODE_ENV=production node server.js"
}
```

## Use the component in a page

To use this component, use a dynamic import with `ssr` set to `false`.
These example pages show that Next.js can switch pages relatively cleanly
with these editor components on them, thanks to `react-monaco-editor` and
the [alternative build of monaco-editor](https://github.com/timkendrick/monaco-editor).

[pages/monaco.js](https://github.com/resources/snippets/blob/master/monaco-editor-with-next/pages/monaco.js)

``` jsx
import dynamic from 'next/dynamic'
const CodeWithMonaco = dynamic(import('../components/code-with-monaco'), {ssr: false})
import Link from 'next/link'

export default () => {
  const someJs = [
    "import {myCoolFunc} from './utils'",
    'export default async () => {',
    '  await myCoolFunc()',
    '}'
  ].join("\n")
  return (
    <div>
      <div>
        <Link href="/monaco-other-page"><a>Other Page</a></Link>
      </div>
      <CodeWithMonaco language="javascript" value={someJs} />
    </div>
  )
}
```

[pages/other-page.js](https://github.com/resources/snippets/blob/master/monaco-editor-with-next/pages/monaco-other-page.js)

``` jsx
import dynamic from 'next/dynamic'
const CodeWithMonaco = dynamic(import('../components/code-with-monaco'), {ssr: false})
import Link from 'next/link'

export default () => {
  const someCss = [
    '.exampleDiv {',
    '  background-color: #003;',
    '  color: #ccc;',
    '}'
  ].join("\n")
  const someJs = [
    "import {myCoolFunc} from './utils'",
    'export default async () => {',
    '  await myCoolFunc()',
    '}'
  ].join("\n")
  return (
    <div>
      <div>
        <Link href="/monaco"><a>Home</a></Link>
      </div>
      <CodeWithMonaco language="css" value={someCss} />
      <CodeWithMonaco language="javascript" value={someJs} />
   </div>
  )
}
```

## Run it

Run it with `next dev` and go to `localhost:3000`.
