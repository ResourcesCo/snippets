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