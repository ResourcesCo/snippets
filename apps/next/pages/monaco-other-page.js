import dynamic from 'next/dynamic'
const CodeWithMonaco = dynamic(import('../components/code-with-monaco'), {ssr: false})
import Link from 'next/link'
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
      <div>
        <Link href="/monaco"><a>Home</a></Link>
      </div>
      <CodeWithMonaco language="css" value={someCss} />
      <CodeWithMonaco language="javascript" value={someJs} />
      <Nav/>
   </div>
  )
}