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