// # [CodeMirror with Next](https://github.com/resources/snippets/blob/master/codemirror-with-next)

// 1.  Create a next app: `create-next-app myapp`
// 2.  Install the CodeMirror dependencies: `npm install react-codemirror2 codemirror --save`
// 3.  Add this to `components`: `components/code-example.js`
// 4.  To use this component, use a dynamic import with `ssr` set to `false`:

//     ``` jsx
//     // pages/code.js
//     import dynamic from 'next/dynamic'
//     const CodeExample = dynamic(import('../components/code-example'), {ssr: false})

//     export default () => {
//       return (
//         <div>
//           <CodeExample />
//         </div>
//       )
//     }
//     ```
import React, { Component } from 'react'
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/mode/javascript/javascript'

export default class CodeExample extends Component {
  render() {
    const code = "for (var i=0; i < 10; i++) {\n  console.log(i)\n}"
    return (
      <div>
        <CodeMirror
          value={code}
          options={{theme: 'material', mode: 'javascript'}}
          onChange={() => null}
        />
        <style jsx global>{`
          @import url('https://unpkg.com/codemirror@5.33.0/lib/codemirror.css');
          @import url('https://unpkg.com/codemirror@5.33.0/theme/material.css');
        `}</style>
      </div>
    )
  }
}