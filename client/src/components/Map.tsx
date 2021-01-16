import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MAPBOX_ACCESS_TOKEN } from '../util/constants';
import { Viewport, Waypoints } from '../types';
import axios from 'axios';

// Components
import ReactMapGL, { Marker, Source, Layer } from 'react-map-gl';
import StyledMarker from './Marker';

const Container = styled.div`
  width: calc(100% - 400px);
  height: 100vh;
`;

type Props = {
  waypoints: Waypoints
  setWaypoints: React.Dispatch<React.SetStateAction<Waypoints>>
}

const Map = ({ waypoints, setWaypoints }: Props) => {
  const [viewport, setViewport] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 0
  } as Viewport);

  useEffect(() => {
    setViewport({
      longitude: -122.48369693756104,//-79.340424,
      latitude: 37.83381888486939,//43.795712,
      zoom: 8
    })
  },[]);

  const directions = '-122.48369693756104,37.83381888486939;-122.49378204345702,37.83368330777276'

  const endpoint = `https://api.mapbox.com/directions/v5/mapbox/driving/${directions}?access_token=${MAPBOX_ACCESS_TOKEN}&geometries=geojson`

  // axios.get(endpoint)
  // .then(res => {
  //   console.log(res);
  // })
  // .catch(err => {
  //   console.log(err);
  // });

const coordinates = [
  [-122.483696, 37.83382],
  [-122.484796, 37.834541],
  [-122.484972, 37.834812],
  [-122.485015, 37.835188],
  [-122.484749, 37.835578],
  [-122.483559, 37.836255],
  [-122.483244, 37.836552],
  [-122.482997, 37.837023],
  [-122.48302, 37.837867],
  [-122.483276, 37.837908],
  [-122.483924, 37.838416],
  [-122.48459, 37.838733],
  [-122.485872, 37.83901],
  [-122.493668, 37.842027],
  [-122.494071, 37.842095],
  [-122.494363, 37.842023],
  [-122.495683, 37.841176],
  [-122.497308, 37.840401],
  [-122.498403, 37.839405],
  [-122.499052, 37.838503],
  [-122.499408, 37.838219],
  [-122.501374, 37.83683],
  [-122.502443, 37.836502],
  [-122.502179, 37.836072],
  [-122.501171, 37.835571],
  [-122.500029, 37.835558],
  [-122.499658, 37.83578],
  [-122.499325, 37.836345],
  [-122.499074, 37.836408],
  [-122.497285, 37.835716],
  [-122.497031, 37.835859],
  [-122.497001, 37.836036],
  [-122.497182, 37.836663],
  [-122.49711, 37.836898],
  [-122.496387, 37.837238],
  [-122.496052, 37.837695],
  [-122.495679, 37.837725],
  [-122.49555, 37.837642],
  [-122.495501, 37.837444],
  [-122.496244, 37.836784],
  [-122.496309, 37.83661],
  [-122.496248, 37.836233],
  [-122.495194, 37.835411],
  [-122.494433, 37.834662],
  [-122.494269, 37.834376],
  [-122.494149, 37.833745],
  [-122.494182, 37.833634],
  [-122.494084, 37.833535],
  [-122.493627, 37.833603],
  [-122.493788, 37.833676]
];

  return (
    <Container>
      {/* <ReactMapGL
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
          coordinates.map((coordinate) => {
            return (
              <Marker longitude={coordinate[0]} latitude={coordinate[1]}>
                <StyledMarker />
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

      </ReactMapGL> */}
    </Container>
  )
};

export default Map;