import dynamic from 'next/dynamic'
const CodeWithMonaco = dynamic(import('../components/code-with-monaco'), {ssr: false})
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'

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
      <CodeWithMonaco language="css" value={someCss} />
      <CodeWithMonaco language="javascript" value={someJs} />
      <Nav/>
   </div>
  )
}