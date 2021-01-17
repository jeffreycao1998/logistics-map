require('dotenv').config();
import shortid from 'shortid';
import { shipments } from '../../index';
import { RouteType, ShipmentType } from '../../types';
import fetchGeoJson from '../../util/fetchGeoJson';

const addShipment = async (_obj: {}, args: ShipmentType, _context: {}) => {
  const { pickupLocation, dropoffLocation, description } = args;

  shipments.push({
    id: `shipment-${shortid.generate()}`,
    pickupLocation,
    dropoffLocation,
    description
  });

  const lastLocation = [] as Array<number>;
  const routes = [] as Array<RouteType>;

  for (let shipment of shipments) {
    if (lastLocation.length > 0) {
      const waypoints = `${lastLocation[0]},${lastLocation[1]};${shipment.pickupLocation[0]},${shipment.pickupLocation[1]}`;
      const url =  `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${waypoints}?source=first&destination=last&roundtrip=false&geometries=geojson&access_token=${process.env.MAPBOX_ACCESS_KEY}`;
      await fetchGeoJson(url, routes, lastLocation, 'pickup', shipment);
    }

    const waypoints = `${shipment.pickupLocation[0]},${shipment.pickupLocation[1]};${shipment.dropoffLocation[0]},${shipment.dropoffLocation[1]}`;
    const url =  `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${waypoints}?source=first&destination=last&roundtrip=false&geometries=geojson&access_token=${process.env.MAPBOX_ACCESS_KEY}`;
    await fetchGeoJson(url, routes, lastLocation, 'dropoff', shipment);
  }

  return {
    shipments,
    routes,
  };
};

export default addShipment;