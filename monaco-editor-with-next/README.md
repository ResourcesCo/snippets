# Monaco Editor with Next.js [WIP]

**WIP**: This is a work in progress. It works by obliterating the global `module`
so Monaco will use AMD instead of commonjs-style loading.

## Create the project and add the dependencies

1. Create a next app: `create-next-app myapp`
2. Install the dependencies: `npm install react-monaco-editor monaco-editor express --save`

## Add the component and a wrapper component

**components/code-example.js**

``` jsx
import React, { Component } from 'react'
import MonacoEditor from 'react-monaco-editor'

export default class CodeExample extends Component {
  render() {
    const js = "class Pet {\n  constructor(name) {\n    this.name = name\n  }\n}"
    const css = ".hello {\n  background-color: yellow;\n}"
    return (
      <div>
        <MonacoEditor
          width={500}
          height={200}
          language="javascript"
          theme="vs-dark"
          value={js}
          options={{selectOnLineNumbers: true}}
          onChange={() => null}
          editorDidMount={() => null}
        />
        <MonacoEditor
          width={500}
          height={200}
          language="css"
          theme="vs-dark"
          value={css}
          options={{selectOnLineNumbers: true}}
          onChange={() => null}
          editorDidMount={() => null}
        />
      </div>
    )
  }
}
```

**components/code-example-wrapper.js**

``` jsx
import dynamic from 'next/dynamic'
import Head from 'next/head'
const CodeExample = dynamic(import('../components/code-example'), {ssr: false})

export default () => {
  return (
    <div>
      <Head>
        <script key="unset-module">{`window.module = undefined;`}</script>
        <script src="/vs/loader.js" key="monaco-loader" />
      </Head>
      <CodeExample />
    </div>
  )
}
```

## Set up a custom server with a static middleware for Monaco Editor

**server.js**

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

  server.use('/vs', express.static(`${__dirname}/node_modules/monaco-editor/min/vs`))

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
```

Change the `scripts` in `package.json` to use the custom server:

``` json
{
  "dev": "node server.js",
  "build": "next build",
  "start": "NODE_ENV=production node server.js"
}
```

## Use the component in a page

To use this component, use a dynamic import with `ssr` set to `false`.

**pages/index.js**

``` jsx
import dynamic from 'next/dynamic'
const CodeExampleWrapper = dynamic(import('../components/code-example-wrapper'), {ssr: false})

export default () => {
  return (
    <div>
      <CodeExampleWrapper />
    </div>
  )
}
```

## Run it

Run it with `next dev` and go to `localhost:3000`.
