import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ViewportType, ShipmentType, RouteType } from '../types';
import { MAPBOX_ACCESS_TOKEN } from '../util/constants';
// import calcMapCenter from '../util/calcMapCenter';
import calcViewport from '../util/calcViewport';

// Components
import ReactMapGL, { Marker, Source, Layer, FlyToInterpolator } from 'react-map-gl';
import StyledMarker from './Marker';
import calcMapZoom from '../util/calcViewport';

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
      const { center, zoom } = calcViewport(shipments);

      setViewport({
        longitude: center[0],
        latitude: center[1],
        zoom: zoom - 1
      })
    }
  },[shipments]);

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
        transitionDuration={200}
        transitionInterpolator={new FlyToInterpolator()}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      >
        {
          routes.length > 0 && routes.map(({id, geojsonCoordinates, sequence}: RouteType, index: number) => {
            const lastIndex = geojsonCoordinates.length - 1;
            return (
              <div key={id}>
                <Marker key={id + 'first'} draggable={true} longitude={ geojsonCoordinates[0][0] } latitude={ geojsonCoordinates[0][1] }>
                  <StyledMarker position={ sequence + 1 }/>
                </Marker>
                {
                  index === routes.length - 1 &&
                  <Marker key={id + 'second'} longitude={ geojsonCoordinates[lastIndex][0] } latitude={ geojsonCoordinates[lastIndex][1] }>
                    <StyledMarker position={ sequence + 2 }/>
                  </Marker>
                }
              </div>
            )
          })
        }
        
        {
          routes.length > 0 && routes.map((route: RouteType) => {
            return (
              <Source
                key={`source-${route.id}`}
                id={`source-${route.id}`} 
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
                  id={`layer-${route.id}`}
                  type='line'
                  source={`source-${route.id}`}
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