# [CodeMirror with Next](https://github.com/resources/snippets/blob/master/codemirror-with-next)

[![live demo](https://img.shields.io/badge/live-demo.svg?style=plastic)](https://resourcessnippets-next-wwvobxipbj.now.sh/codemirror)

## create & configure the app

Create the app:

``` bash
create-next-app myapp
```

Install the CodeMirror dependencies:

``` bash
npm install react-codemirror2 codemirror --save
```

## add the component

[components/code-with-codemirror.js](https://github.com/resources/snippets/blob/master/apps/next/components/code-with-codemirror.js)

``` jsx
import React, { Component } from 'react'
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/mode/javascript/javascript'

export default (props) => (
  <div>
    <CodeMirror
      {...props}
      value={props.value}
      options={{theme: 'material', mode: 'javascript'}}
      onChange={() => null}
    />
    <style jsx global>{`
      @import url('https://unpkg.com/codemirror@5.33.0/lib/codemirror.css');
      @import url('https://unpkg.com/codemirror@5.33.0/theme/material.css');
    `}</style>
  </div>
)
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
