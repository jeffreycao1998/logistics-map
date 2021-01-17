require('dotenv').config();
import axios from 'axios';
import { shipments } from '../../index';
import { RouteType, ShipmentType } from '../../types';

const addShipment = async (_obj: {}, args: ShipmentType, _context: {}) => {
  const { pickupLocation, dropoffLocation, description } = args;

  shipments.push({
    pickupLocation,
    dropoffLocation,
    description
  });

  let lastLocation: Array<[number, number]> | null = null;
  const routes = [] as Array<RouteType>;

  for (let shipment of shipments) {
    if (lastLocation !== null) {
      const url = 'https://api.mapbox.com/optimized-trips/v1/mapbox' + '/driving' +
        `/${lastLocation[0]},${lastLocation[1]};${shipment.pickupLocation[0]},${shipment.pickupLocation[1]}` +
        '?source=first' + '&destination=last' + '&roundtrip=false' + '&geometries=geojson' + 
        `&access_token=${process.env.MAPBOX_ACCESS_KEY}`;

      await axios.get(url)
      .then(res => {
        const geojsonCoordinates = res.data.trips[0].geometry.coordinates;

        routes.push({
          type: 'pickup',
          sequence: routes.length,
          geojsonCoordinates
        });
        lastLocation = geojsonCoordinates[geojsonCoordinates.length - 1];
      })
      .catch(err => console.log(err.message));
    }

    const url = 'https://api.mapbox.com/optimized-trips/v1/mapbox' + '/driving' +
      `/${shipment.pickupLocation[0]},${shipment.pickupLocation[1]};${shipment.dropoffLocation[0]},${shipment.dropoffLocation[1]}` +
      '?source=first' + '&destination=last' + '&roundtrip=false' + '&geometries=geojson' +
      `&access_token=${process.env.MAPBOX_ACCESS_KEY}`;
    
    await axios.get(url)
    .then(res => {
      const geojsonCoordinates = res.data.trips[0].geometry.coordinates;

      routes.push({
        type: 'dropoff',
        sequence: routes.length,
        geojsonCoordinates
      });
      lastLocation = geojsonCoordinates[geojsonCoordinates.length - 1];
    })
    .catch(err => console.log(err.message));
  }

  return {
    shipments,
    routes,
  };
};

export default addShipment;