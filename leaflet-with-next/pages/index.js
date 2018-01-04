import dynamic from 'next/dynamic'
import NextHead from 'next/head'
const HelloWorldMap = dynamic(import('../components/HelloWorldMap'), {ssr: false})

export default () => {
  return (
    <div>
      <NextHead>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css"
      integrity="sha512-M2wvCLH6DSRazYeZRIm1JnYyh22purTM+FDB5CsyxtQJYeKq83arPe5wgbNmcFXGqiSH2XR8dT/fJISVA1r/zQ=="
      crossorigin="" key="leaflet.css"/>
      </NextHead>
      <HelloWorldMap />
    </div>
  )
}
