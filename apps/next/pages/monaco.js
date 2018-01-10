import dynamic from 'next/dynamic'
const CodeWithMonaco = dynamic(import('../components/code-with-monaco'), {ssr: false})
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'

export default () => {
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
        <Link href="/monaco-other-page"><a>Other Page</a></Link>
      </div>
      <CodeWithMonaco language="javascript" value={someJs} />
      <Nav/>
    </div>
  )
}