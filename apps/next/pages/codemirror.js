import dynamic from 'next/dynamic'
const CodeWithCodemirror = dynamic(import('../components/code-with-codemirror'), {ssr: false})
import Head from 'next/head'
import Nav from '../components/nav'

export default () => {
  return (
    <div>
      <Head>
        <link key="codemirror-css-lib" rel="stylesheet" href="https://unpkg.com/codemirror@5.33.0/lib/codemirror.css" />
        <link key="codemirror-css-theme-material" rel="stylesheet" href="https://unpkg.com/codemirror@5.33.0/theme/material.css" />
      </Head>
      <CodeWithCodemirror value={"for (var i=0; i < 10; i++) {\n  console.log(i)\n}"} />
      <Nav/>
    </div>
  )
}