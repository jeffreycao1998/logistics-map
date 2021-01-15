import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import env from '../env.json';
import ReactDom from 'react-dom';
import mapboxgl from 'mapbox-gl';
import { MapOptions } from '../types';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const MapContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Map = () => {
  mapboxgl.accessToken = env.MAPBOX_ACCESS_TOKEN;

  const [mapOptions, setMapOptions] = useState({
    lng: 5,
    lat: 34,
    zoom: 2
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