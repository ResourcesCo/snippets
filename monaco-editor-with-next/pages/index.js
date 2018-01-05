import dynamic from 'next/dynamic'
const CodeExampleWrapper = dynamic(import('../components/code-example-wrapper'), {ssr: false})

export default () => {
  return (
    <div>
      <CodeExampleWrapper />
    </div>
  )
}