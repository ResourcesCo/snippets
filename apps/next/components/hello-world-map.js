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