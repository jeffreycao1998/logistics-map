import { ShipmentType, RouteType } from '../types';
import fetchGeoJson from './fetchGeoJson';

const calcOptimalRoute = async (shipments: Array<ShipmentType>) => {
  const lastLocation = [] as Array<number>;
  const routes = [] as Array<RouteType>;

  for (let shipment of shipments) {
    if (lastLocation.length > 0) {
      shipment.pickupLocation[2] = routes.length;

      // add route to pickup zone
      const waypoints = `${lastLocation[0]},${lastLocation[1]};${shipment.pickupLocation[0]},${shipment.pickupLocation[1]}`;
      const url = `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${waypoints}?source=first&destination=last&roundtrip=false&geometries=geojson&access_token=${process.env.MAPBOX_ACCESS_KEY}`;
      await fetchGeoJson(url, routes, lastLocation, 'pickup');
    }

    shipment.dropoffLocation[2] = routes.length;
    
    // add route to dropoff zone
    const waypoints = `${shipment.pickupLocation[0]},${shipment.pickupLocation[1]};${shipment.dropoffLocation[0]},${shipment.dropoffLocation[1]}`;
    const url = `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${waypoints}?source=first&destination=last&roundtrip=false&geometries=geojson&access_token=${process.env.MAPBOX_ACCESS_KEY}`;
    await fetchGeoJson(url, routes, lastLocation, 'dropoff');
  }

  return routes;
};

export default calcOptimalRoute;