import Link from 'next/link'
import examples from '../config/examples'

export default () => (
  <div>
    <h1>⬇️ ⬇️ ⬇️</h1>
    <div className="list">
      <div className="inner">
        {
          examples.map((example, ix) => (
            <span key={example.url}>{ix ? ' • ' : ' '}<Link href={example.url}><a>{example.title}</a></Link></span>
          ))
        }
      </div>
      <style jsx>{`
        .list {
          position: fixed;
          left: 0px;
          bottom: 0px;
          padding: 10px;
        }
        .inner {
          border: 2px solid #bbb;
          border-radius: 5px;
          padding: 5px;
        }
      `}</style>
    </div>
  </div>
)