# CodeMirror with Next

[![live demo](https://img.shields.io/badge/live-demo-green.svg?style=plastic)](https://resourcessnippets-next.now.sh/codemirror)

## create & configure the app

Create the app:

``` bash
create-next-app myapp
```

Install the CodeMirror dependencies:

``` bash
npm install react-codemirror2 codemirror @zeit/next-css css-loader --save
```

## add the component

[components/code-with-codemirror.js](https://github.com/resources/snippets/blob/master/apps/next/components/code-with-codemirror.js)

``` jsx
import React, { Component } from 'react'
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'

export default (props) => (
  <div>
    <CodeMirror
      {...props}
      value={props.value}
      options={{theme: 'material', mode: 'javascript'}}
      onChange={() => null}
    />
  </div>
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

## add the component to a page

To use this component, use a dynamic import with `ssr` set to `false`:

[pages/codemirror.js](https://github.com/resources/snippets/blob/master/apps/next/pages/codemirror.js)

``` jsx
import dynamic from 'next/dynamic'
const CodeWithCodemirror = dynamic(import('../components/code-with-codemirror'), {ssr: false})

export default () => {
  return (
    <div>
      <CodeWithCodemirror value={"for (var i=0; i < 10; i++) {\n  console.log(i)\n}"} />
    </div>
  )
}
```
