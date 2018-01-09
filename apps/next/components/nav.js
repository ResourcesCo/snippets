import Link from 'next/link'
import examples from '../config/examples'

export default () => (
  <div className="home">
    <Link href="/"><a>Home</a></Link>
    <style jsx>{`
      .home {
        position: fixed;
        left: 0px;
        bottom: 0px;
        z-index: 1000;
        background-color: #bbb;
        padding: 5px 12px 5px 10px;
        border-top-right-radius: 10px;
      }
      .home a {
        color: black;
        text-decoration: none;
      }
    `}</style>
  </div>
)