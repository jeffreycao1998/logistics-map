//////////////
////////////// BASIC IN ORDER ALGORITHM (does not scale very well at all)
//////////////

import { ShipmentType, RouteType } from '../types';
import fetchGeoJson from './fetchGeoJson';

const calcOptimalRoute = async (shipments: Array<ShipmentType>) => {
  const lastLocation = [] as Array<number>;
  const routes = [] as Array<RouteType>;

  for (let shipment of shipments) {

    if (lastLocation.length > 0) {
      // add route to pickup zone
      const waypoints = `${lastLocation[0]},${lastLocation[1]};${shipment.pickupLocation[0]},${shipment.pickupLocation[1]}`;
      const url = `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${waypoints}?source=first&destination=last&roundtrip=false&geometries=geojson&access_token=${process.env.MAPBOX_ACCESS_KEY}`;
      await fetchGeoJson(url, routes, lastLocation, 'pickup', shipment);
    }
    
    // add route to dropoff zone
    const waypoints = `${shipment.pickupLocation[0]},${shipment.pickupLocation[1]};${shipment.dropoffLocation[0]},${shipment.dropoffLocation[1]}`;
    const url = `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${waypoints}?source=first&destination=last&roundtrip=false&geometries=geojson&access_token=${process.env.MAPBOX_ACCESS_KEY}`;
    await fetchGeoJson(url, routes, lastLocation, 'dropoff', shipment);
  }

  // add route back to starting point
  const waypoints = `${lastLocation[0]},${lastLocation[1]};${shipments[0].pickupLocation[0]},${shipments[0].pickupLocation[1]}`;
  const url = `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${waypoints}?source=first&destination=last&roundtrip=false&geometries=geojson&access_token=${process.env.MAPBOX_ACCESS_KEY}`;
  await fetchGeoJson(url, routes, lastLocation, 'recall');

  return routes;
};

export default calcOptimalRoute;