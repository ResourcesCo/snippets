import dynamic from 'next/dynamic'
const CodeWithCodemirror = dynamic(import('../components/code-with-codemirror'), {ssr: false})
import Nav from '../components/nav'

export default () => {
  return (
    <div>
      <CodeWithCodemirror value={"for (var i=0; i < 10; i++) {\n  console.log(i)\n}"} />
      <Nav/>
    </div>
  )
}