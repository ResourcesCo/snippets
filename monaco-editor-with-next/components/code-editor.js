window.MonacoEnvironment = { baseUrl: '/monaco-editor-external' };
import * as monaco from '@timkendrick/monaco-editor/dist/external'
import React, { Component } from 'react'
import MonacoEditor from 'react-monaco-editor'

export default class CodeEditor extends Component {
  render() {
    return (
      <MonacoEditor
        width={500}
        height={200}
        language="javascript"
        theme="vs-dark"
        value=""
        options={{selectOnLineNumbers: true}}
        onChange={() => null}
        editorDidMount={() => null}
        {...this.props}
      />
    )
  }
}