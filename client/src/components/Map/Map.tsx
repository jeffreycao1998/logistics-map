import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ViewportType, ShipmentType, RouteType } from '../../types';
import { MAPBOX_ACCESS_TOKEN, SIDEBAR_WIDTH } from '../../util/constants'; 
import calcViewport from '../../util/calcViewport';

// Components
import ReactMapGL, { Marker, Source, Layer, FlyToInterpolator } from 'react-map-gl';
import StyledMarker from './WaypointMarker';

const Container = styled.div`
  width: calc(100% - ${SIDEBAR_WIDTH}px);
  height: 100vh;
`;

const LegendContainer = styled.div`
  position: absolute;
  bottom: 32px;
  right: 24px;
  background-color: darkgray;
  border-radius: 12px;
  padding: 16px 24px;
  > :not(:last-child) {
    margin-bottom: 12px;
  }
`;

type LegendItemProps = {
  color: string
};

const LegendItem = styled.div`
  display: flex;
  align-items: center;

  .color-square {
    background-color: ${({color}: LegendItemProps) => color};
    width: 20px;
    height: 20px;
    margin-right: 8px;
    border-radius: 2px;
    border: 1px solid grey;
  }

  p {
    font-size: 16px;
  }
`;

type Props = {
  shipments: Array<ShipmentType>
  routes: Array<RouteType>
};

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
      });
    }
  },[shipments]);

  const getRouteColor = (type: 'pickup' | 'dropoff' | 'recall') => {
    switch(type) {
      case 'pickup':
        return '#fae902';
      case 'dropoff':
        return '#029ffa';
      case 'recall':
        return '#b03bc0';
      default:
        return 'lightgrey';
    }
  };

  return (
    <Container>
      <ReactMapGL
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/dark-v9"

        latitude={viewport.latitude}
        longitude={viewport.longitude}
        zoom={viewport.zoom}
        
        onViewportChange={(nextViewport: ViewportType) => setViewport(nextViewport)}
        transitionDuration={200}
        transitionInterpolator={new FlyToInterpolator()}

        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      >
        {
          routes.length > 0 && routes.map(({id, geojsonCoordinates, sequence}: RouteType) => {
            return (
              <Marker 
                key={id} 
                draggable={ true }
                longitude={ geojsonCoordinates[0][0] }
                latitude={ geojsonCoordinates[0][1] }
              >
                <StyledMarker position={ sequence + 1 }/>
              </Marker>
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
                    'line-color': getRouteColor(route.type),
                    'line-width': 6
                  }}
                />
              </Source>
            )
          })
        }

      </ReactMapGL>

      <LegendContainer>
        <LegendItem color='#fae902'>
          <div className='color-square'></div>
          <p>Pickup route</p>
        </LegendItem>
        <LegendItem color='#029ffa'>
          <div className='color-square'></div>
          <p>Dropoff route</p>
        </LegendItem>
        <LegendItem color='#b03bc0'>
          <div className='color-square'></div>
          <p>Back to start</p>
        </LegendItem>
      </LegendContainer>
    </Container>
  )
};

export default Map;