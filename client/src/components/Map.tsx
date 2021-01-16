import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MAPBOX_ACCESS_TOKEN } from '../util/constants';
import { Viewport } from '../types';

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
      longitude: -79.340424,
      latitude: 43.795712,
      zoom: 8
    })
  },[])

  const geojson = {
    type: 'FeatureCollection',
    features: [
      {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.4, 37.8]}}
    ]
  };

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
      </ReactMapGL>
    </Container>
  )
};

export default Map;