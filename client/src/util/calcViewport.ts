import { ShipmentType } from '../types';
import { SIDEBAR_WIDTH } from '../util/constants';
import geoViewport from '@mapbox/geo-viewport';

const calcViewport = (shipments: Array<ShipmentType>) => {
  let minLng = 180;
  let maxLng = -180;
  let minLat = 90;
  let maxLat = -90;

  for (let shipment of shipments) {
    const { pickupLocation, dropoffLocation } = shipment;
    
    if (pickupLocation[0] < minLng) minLng = pickupLocation[0];
    if (pickupLocation[0] > maxLng) maxLng = pickupLocation[0];

    if (dropoffLocation[0] < minLng) minLng = dropoffLocation[0];
    if (dropoffLocation[0] > maxLng) maxLng = dropoffLocation[0];

    if (pickupLocation[1] < minLat) minLat = pickupLocation[1];
    if (pickupLocation[1] > maxLat) maxLat = pickupLocation[1];

    if (dropoffLocation[1] < minLat) minLat = dropoffLocation[1];
    if (dropoffLocation[1] > maxLat) maxLat = dropoffLocation[1];
  }
  
  const bounds = geoViewport.viewport([
    minLng,
    minLat,
    maxLng,
    maxLat,
  ], [window.innerWidth - SIDEBAR_WIDTH, window.innerHeight])

  return bounds;
};

export default calcViewport;