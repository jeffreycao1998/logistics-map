import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MAPBOX_ACCESS_TOKEN } from '../util/constants';
import { Shipment, Viewport, Waypoints } from '../types';
import axios from 'axios';

// Components
import ReactMapGL, { Marker, Source, Layer } from 'react-map-gl';
import StyledMarker from './Marker';

const Container = styled.div`
  width: calc(100% - 400px);
  height: 100vh;
`;

type Props = {
  shipments: Array<Shipment>
  setShipments: React.Dispatch<React.SetStateAction<Array<Shipment>>>
}

const Map = ({ shipments, setShipments }: Props) => {
  const [viewport, setViewport] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 0
  } as Viewport);
  const [coordinates, setCoordinates] = useState([] as Array<[number, number]>);
  const [waypoints, setWaypoints] = useState([] as any);

  useEffect(() => {
    setViewport({
      longitude: (Number(shipments[0].pickup.lng) + Number(shipments[0].dropoff.lng)) / 2,
      latitude: (Number(shipments[0].pickup.lat) + Number(shipments[0].dropoff.lat)) / 2,
      zoom: 4
    })
  },[]);

  const formattedWaypoints = shipments.map(({pickup, dropoff}: Shipment) => {
    return `${pickup.lng},${pickup.lat};${dropoff.lng},${dropoff.lat}`;
  }).join(';');

  // const endpoint = `https://api.mapbox.com/directions/v5/mapbox/driving/${directions}?access_token=${MAPBOX_ACCESS_TOKEN}&geometries=geojson`
  const optimizationEndpoint = `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${formattedWaypoints}?source=first&roundtrip=true&geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`

  useEffect(() => {
    // axios.get(optimizationEndpoint)
    // .then(res => {
    //   setCoordinates(res.data.trips[0].geometry.coordinates);

    //   const waypoints = res.data.waypoints.map((waypoint: any) => {
    //     return {
    //       location: waypoint.location,
    //       waypointIndex: waypoint.waypoint_index
    //     }
    //   });

    //   setWaypoints([...waypoints])
    // })
    // .catch(err => {
    //   console.log(err);
    // });
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
        onViewportChange={(nextViewport: Viewport) => setViewport(nextViewport)}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      >
        {
          waypoints.length > 0 && waypoints.map((waypoint: any) => {
            return (
              <Marker longitude={ waypoint.location[0] } latitude={ waypoint.location[1] }>
                <StyledMarker position={ waypoint.waypointIndex + 1 }/>
              </Marker>
            )
          })
        }
        
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