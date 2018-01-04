import dynamic from 'next/dynamic'
const CodeExample = dynamic(import('../components/code-example'), {ssr: false})

export default () => {
  return (
    <div>
      <CodeExample />
    </div>
  )
}