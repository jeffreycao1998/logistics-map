import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MAPBOX_ACCESS_TOKEN } from '../util/constants';
import { Viewport } from '../types';
import axios from 'axios';

// Components
import ReactMapGL, { Marker, Source, Layer } from 'react-map-gl';
import StyledMarker from './Marker';

const Container = styled.div`
  width: calc(100% - 400px);
  height: 100vh;
`;

const Map = () => {
  const [viewport, setViewport] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 0
  } as Viewport);
  const [coordinates, setCoordinates] = useState({})

  useEffect(() => {
    setViewport({
      longitude: -122.48369693756104,//-79.340424,
      latitude: 37.83381888486939,//43.795712,
      zoom: 8
    })
  },[]);

  axios.get("https://api.mapbox.com/optimized-trips/v1/mapbox/driving/-79.340424,43.795712;-75.340424,38.795712?access_token=pk.eyJ1IjoiamVmZnJleWNhbzE5OTgiLCJhIjoiY2tldDIzdWdqMG5xZDJwcGVjYmpiYnE0NiJ9._mpFf2LjB-ZFa1NC5xUU1Q")
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });

  return (
    <Container>
      <ReactMapGL
        width="100%"
        height="100%"
        latitude={viewport.latitude}
        longitude={viewport.longitude}
        zoom={viewport.zoom}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={(nextViewport: Viewport) => setViewport(nextViewport)}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      >
        {/* {
          coordinates.map((coordinate) => {
            return (
              <Marker longitude={coordinate[0]} latitude={coordinate[1]}>
                <StyledMarker />
              </Marker>
            )
          })
        } */}
        
        <Source 
          id="my-data" 
          type="geojson" 
          data={{
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [
                [-122.48369693756104, 37.83381888486939],
                [-122.48348236083984, 37.83317489144141],
                [-122.48339653015138, 37.83270036637107],
                [-122.48356819152832, 37.832056363179625],
                [-122.48404026031496, 37.83114119107971],
                [-122.48404026031496, 37.83049717427869],
                [-122.48348236083984, 37.829920943955045],
                [-122.48356819152832, 37.82954808664175],
                [-122.48507022857666, 37.82944639795659],
                [-122.48610019683838, 37.82880236636284],
                [-122.48695850372314, 37.82931081282506],
                [-122.48700141906738, 37.83080223556934],
                [-122.48751640319824, 37.83168351665737],
                [-122.48803138732912, 37.832158048267786],
                [-122.48888969421387, 37.83297152392784],
                [-122.48987674713133, 37.83263257682617],
                [-122.49043464660643, 37.832937629287755],
                [-122.49125003814696, 37.832429207817725],
                [-122.49163627624512, 37.832564787218985],
                [-122.49223709106445, 37.83337825839438],
                [-122.49378204345702, 37.83368330777276]
              ]
            }
          }}
        >
          <Layer
            id='route'
            type='line'
            source='route'
            layout={{
              'line-join': 'round',
              'line-cap': 'round'
            }}
            paint={{
              'line-color': '#029ffa',
              'line-width': 8
            }}
          />
        </Source>

      </ReactMapGL>
    </Container>
  )
};

export default Map;