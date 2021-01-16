import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { MAPBOX_ACCESS_TOKEN } from '../util/constants';
import mapboxgl from 'mapbox-gl';
import { MapOptions } from '../types';

const Container = styled.div`
  width: calc(100% - 400px);
  height: 100vh;
`;

const MapContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: calc(100% - 400px);
`;

const Map = () => {
  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

  const [mapOptions, setMapOptions] = useState({
    lng: -79.340424,
    lat: 43.795712,
    zoom: 6
  } as MapOptions);

  const mapRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      // @ts-ignore
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [mapOptions.lng, mapOptions.lat],
      zoom: mapOptions.zoom
    })
  },[]);

  return (
    <Container>
      <MapContainer ref={mapRef}>

      </MapContainer>
    </Container>
  )
};

export default Map;