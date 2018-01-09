'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = require('styled-jsx/style.js');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCodemirror = require('react-codemirror2');

require('codemirror/mode/javascript/javascript');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/bat/clone/github/resources/snippets/codemirror-with-next/components/code-example.js';
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


var CodeExample = function (_Component) {
  (0, _inherits3.default)(CodeExample, _Component);

  function CodeExample() {
    (0, _classCallCheck3.default)(this, CodeExample);

    return (0, _possibleConstructorReturn3.default)(this, (CodeExample.__proto__ || (0, _getPrototypeOf2.default)(CodeExample)).apply(this, arguments));
  }

  (0, _createClass3.default)(CodeExample, [{
    key: 'render',
    value: function render() {
      var code = "for (var i=0; i < 10; i++) {\n  console.log(i)\n}";
      return _react2.default.createElement('div', {
        className: 'jsx-3343032258',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        }
      }, _react2.default.createElement(_reactCodemirror.UnControlled, {
        value: code,
        options: { theme: 'material', mode: 'javascript' },
        onChange: function onChange() {
          return null;
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 30
        }
      }), _react2.default.createElement(_style2.default, {
        styleId: '3343032258',
        css: '@import url(\'https://unpkg.com/codemirror@5.33.0/lib/codemirror.css\');@import url(\'https://unpkg.com/codemirror@5.33.0/theme/material.css\');\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY29kZS1leGFtcGxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWtDMkIsQUFFZ0YsQUFDQSIsImZpbGUiOiJjb21wb25lbnRzL2NvZGUtZXhhbXBsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvYmF0L2Nsb25lL2dpdGh1Yi9yZXNvdXJjZXMvc25pcHBldHMvY29kZW1pcnJvci13aXRoLW5leHQiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAjIFtDb2RlTWlycm9yIHdpdGggTmV4dF0oaHR0cHM6Ly9naXRodWIuY29tL3Jlc291cmNlcy9zbmlwcGV0cy9ibG9iL21hc3Rlci9jb2RlbWlycm9yLXdpdGgtbmV4dClcblxuLy8gMS4gIENyZWF0ZSBhIG5leHQgYXBwOiBgY3JlYXRlLW5leHQtYXBwIG15YXBwYFxuLy8gMi4gIEluc3RhbGwgdGhlIENvZGVNaXJyb3IgZGVwZW5kZW5jaWVzOiBgbnBtIGluc3RhbGwgcmVhY3QtY29kZW1pcnJvcjIgY29kZW1pcnJvciAtLXNhdmVgXG4vLyAzLiAgQWRkIHRoaXMgdG8gYGNvbXBvbmVudHNgOiBgY29tcG9uZW50cy9jb2RlLWV4YW1wbGUuanNgXG4vLyA0LiAgVG8gdXNlIHRoaXMgY29tcG9uZW50LCB1c2UgYSBkeW5hbWljIGltcG9ydCB3aXRoIGBzc3JgIHNldCB0byBgZmFsc2VgOlxuXG4vLyAgICAgYGBgIGpzeFxuLy8gICAgIC8vIHBhZ2VzL2NvZGUuanNcbi8vICAgICBpbXBvcnQgZHluYW1pYyBmcm9tICduZXh0L2R5bmFtaWMnXG4vLyAgICAgY29uc3QgQ29kZUV4YW1wbGUgPSBkeW5hbWljKGltcG9ydCgnLi4vY29tcG9uZW50cy9jb2RlLWV4YW1wbGUnKSwge3NzcjogZmFsc2V9KVxuXG4vLyAgICAgZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuLy8gICAgICAgcmV0dXJuIChcbi8vICAgICAgICAgPGRpdj5cbi8vICAgICAgICAgICA8Q29kZUV4YW1wbGUgLz5cbi8vICAgICAgICAgPC9kaXY+XG4vLyAgICAgICApXG4vLyAgICAgfVxuLy8gICAgIGBgYFxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtVbkNvbnRyb2xsZWQgYXMgQ29kZU1pcnJvcn0gZnJvbSAncmVhY3QtY29kZW1pcnJvcjInXG5pbXBvcnQgJ2NvZGVtaXJyb3IvbW9kZS9qYXZhc2NyaXB0L2phdmFzY3JpcHQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvZGVFeGFtcGxlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNvZGUgPSBcImZvciAodmFyIGk9MDsgaSA8IDEwOyBpKyspIHtcXG4gIGNvbnNvbGUubG9nKGkpXFxufVwiXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxDb2RlTWlycm9yXG4gICAgICAgICAgdmFsdWU9e2NvZGV9XG4gICAgICAgICAgb3B0aW9ucz17e3RoZW1lOiAnbWF0ZXJpYWwnLCBtb2RlOiAnamF2YXNjcmlwdCd9fVxuICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiBudWxsfVxuICAgICAgICAvPlxuICAgICAgICA8c3R5bGUganN4IGdsb2JhbD57YFxuICAgICAgICAgIEBpbXBvcnQgdXJsKCdodHRwczovL3VucGtnLmNvbS9jb2RlbWlycm9yQDUuMzMuMC9saWIvY29kZW1pcnJvci5jc3MnKTtcbiAgICAgICAgICBAaW1wb3J0IHVybCgnaHR0cHM6Ly91bnBrZy5jb20vY29kZW1pcnJvckA1LjMzLjAvdGhlbWUvbWF0ZXJpYWwuY3NzJyk7XG4gICAgICAgIGB9PC9zdHlsZT5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufSJdfQ== */\n/*@ sourceURL=components/code-example.js */'
      }));
    }
  }]);

  return CodeExample;
}(_react.Component);

exports.default = CodeExample;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY29kZS1leGFtcGxlLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiVW5Db250cm9sbGVkIiwiQ29kZU1pcnJvciIsIkNvZGVFeGFtcGxlIiwiY29kZSIsInRoZW1lIiwibW9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBLEFBQU8sQUFBUzs7OztBQUNoQixBQUFRLEFBQWdCOztBQUN4Qjs7Ozs7QUF0QkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0lBS3FCLEE7Ozs7Ozs7Ozs7OzZCQUNWLEFBQ1A7VUFBTSxPQUFOLEFBQWEsQUFDYjs2QkFDRSxjQUFBO21CQUFBOztvQkFBQTtzQkFBQSxBQUNFO0FBREY7QUFBQSxPQUFBLGtCQUNFLEFBQUM7ZUFBRCxBQUNTLEFBQ1A7aUJBQVMsRUFBQyxPQUFELEFBQVEsWUFBWSxNQUYvQixBQUVXLEFBQTBCLEFBQ25DO2tCQUFVLG9CQUFBO2lCQUFBLEFBQU07QUFIbEI7O29CQUFBO3NCQURGLEFBQ0U7QUFBQTtBQUNFO2lCQUZKO2FBREYsQUFDRSxBQVlIO0FBWkc7Ozs7O0FBSm1DLEE7O2tCQUFwQixBIiwiZmlsZSI6ImNvZGUtZXhhbXBsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvYmF0L2Nsb25lL2dpdGh1Yi9yZXNvdXJjZXMvc25pcHBldHMvY29kZW1pcnJvci13aXRoLW5leHQifQ==