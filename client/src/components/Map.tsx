import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MAPBOX_ACCESS_TOKEN } from '../util/constants';
import { ViewportType, ShipmentType, RouteType } from '../types';

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
  const [coordinates, setCoordinates] = useState([] as Array<[number, number]>);

  useEffect(() => {
    setViewport({
      longitude: (Number(shipments[0].pickupLocation[1]) + Number(shipments[0].dropoffLocation[0]])) / 2,
      latitude: (Number(shipments[0].pickupLocation[1]) + Number(shipments[0].dropoffLocation[0])) / 2,
      zoom: 4
    })
  },[]);

  useEffect(() => {

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
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      >
        {/* {
          waypoints.length > 0 && waypoints.map((waypoint: any) => {
            return (
              <Marker longitude={ waypoint.location[0] } latitude={ waypoint.location[1] }>
                <StyledMarker position={ waypoint.waypointIndex + 1 }/>
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
              coordinates
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