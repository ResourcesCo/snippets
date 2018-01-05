import dynamic from 'next/dynamic'
import Head from 'next/head'
const CodeExample = dynamic(import('../components/code-example'), {ssr: false})

export default () => {
  return (
    <div>
      <Head>
        <script key="unset-module">{`window.module = undefined;`}</script>
        <script src="/vs/loader.js" key="monaco-loader" />
      </Head>
      <CodeExample />
    </div>
  )
}