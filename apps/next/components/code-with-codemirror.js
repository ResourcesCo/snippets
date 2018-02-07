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