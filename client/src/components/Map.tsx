import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MAPBOX_ACCESS_TOKEN } from '../util/constants';
import { ViewportType, ShipmentType, RouteType } from '../types';
import shortid from 'shortid';

// Components
import ReactMapGL, { Marker, Source, Layer } from 'react-map-gl';
import StyledMarker from './Marker';

const Container = styled.div`
  width: calc(100% - 400px);
  height: 100vh;
`;

type Props = {
  shipments: Array<ShipmentType>
  routes: Array<RouteType>
}

const Map = ({ shipments, routes }: Props) => {
  const [viewport, setViewport] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 0
  } as ViewportType);

  useEffect(() => {
    if (shipments.length > 0) {
      setViewport({
        longitude: (shipments[0].pickupLocation[0] + shipments[0].dropoffLocation[0]) / 2,
        latitude: (shipments[0].pickupLocation[1] + shipments[0].dropoffLocation[1]) / 2,
        zoom: 8
      })
    }
  },[shipments]);

  useEffect(() => {
    console.log(routes);
  },[routes]);

  return (
    <Container>
      <ReactMapGL
        width="100%"
        height="100%"
        latitude={viewport.latitude}
        longitude={viewport.longitude}
        zoom={viewport.zoom}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={(nextViewport: ViewportType) => setViewport(nextViewport)}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      >
        {
          routes.length > 0 && routes.map(({geojsonCoordinates, sequence}: RouteType, index: number) => {
            const lastIndex = geojsonCoordinates.length - 1;
            return (
              <>
                <Marker key={index + geojsonCoordinates[0][0]} draggable={true} longitude={ geojsonCoordinates[0][0] } latitude={ geojsonCoordinates[0][1] }>
                  <StyledMarker position={ index + 1 }/>
                </Marker>
                {
                  index === routes.length - 1 &&
                  <Marker key={index + geojsonCoordinates[lastIndex][0]} longitude={ geojsonCoordinates[lastIndex][0] } latitude={ geojsonCoordinates[lastIndex][1] }>
                    <StyledMarker position={ index + 2 }/>
                  </Marker>
                }
              </>
            )
          })
        }
        
        {
          routes.length > 0 && routes.map((route: RouteType) => {
            return (
              <Source
                key={`${route.geojsonCoordinates[0][0]}${route.geojsonCoordinates[0][1]}`}
                id={`${route.geojsonCoordinates[0][0]}${route.geojsonCoordinates[0][1]}`} 
                type="geojson" 
                data={{
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'LineString',
                    coordinates: route.geojsonCoordinates
                  }
                }}
              >
                <Layer
                  id={`${route.geojsonCoordinates[0][0]}${route.geojsonCoordinates[0][1]}`}
                  type='line'
                  source={`${route.geojsonCoordinates[0][0]}${route.geojsonCoordinates[0][1]}`}
                  layout={{
                    'line-join': 'round',
                    'line-cap': 'round'
                  }}
                  paint={{
                    'line-color': `${route.type === 'pickup' ? '#fae902' : '#029ffa'}`,
                    'line-width': 8
                  }}
                />
              </Source>
            )
          })
        }

      </ReactMapGL>
    </Container>
  )
};

export default Map;