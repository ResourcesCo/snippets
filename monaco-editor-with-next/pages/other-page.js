import dynamic from 'next/dynamic'
const CodeEditor = dynamic(import('../components/code-editor'), {ssr: false})
import Link from 'next/link'
import Head from 'next/head'

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
      <Head>
        <link key="monaco-css" rel="stylesheet" href="/monaco-editor-external/monaco.css" />
      </Head>
      <div>
        <Link href="/"><a>Home</a></Link>
      </div>
      <CodeEditor language="css" value={someCss} />
      <CodeEditor language="javascript" value={someJs} />
    </div>
  )
}