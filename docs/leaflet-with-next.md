# Leaflet with Next

[![live demo](https://img.shields.io/badge/live-demo-green.svg?style=plastic)](https://resourcessnippets-next-wmiqaxnerc.now.sh/leaflet)

## create & configure the app

Create a next app:

``` bash
create-next-app myapp
```

Install the dependencies:

``` bash
npm install react-leaflet leaflet prop-types --save
```

## add the component

[components/hello-world-map.js](https://github.com/resources/snippets/blob/master/apps/next/components/hello-world-map.js)

``` jsx
import React, { Component } from 'react'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'

export default class HelloWorldMap extends Component {
  render() {
    return (
      <div className="wrapper">
        <Map center={[40.015, -105.28]} zoom={14}>
          <TileLayer
            attribution={'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[40.0168, -105.2829]}>
            <Popup>
              <span>Hello World</span>
            </Popup>
          </Marker>
        </Map>
        <style jsx>{`
          .wrapper :global(.leaflet-container) {
            width: 100%;
            height: 100%;
            min-width: 500px;
            min-height: 400px;
          }
        `}</style>
      </div>
    )
  }
}
```

Add a page that uses the component.

This uses a custom stylesheet and a dynamic import with `ssr` set to `false`.

[pages/leaflet.js](https://github.com/resources/snippets/blob/master/apps/next/pages/leaflet.js)

``` jsx
// pages/map.js
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
```