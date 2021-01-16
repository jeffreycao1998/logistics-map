require('dotenv').config();
import axios from 'axios';
import { shipments } from '../../index';
import { ShipmentType, RouteType } from '../../types';

const addShipment = async (_obj: {}, args: ShipmentType, _context: {}) => {
  const { pickupLocation, dropoffLocation, description } = args;

  shipments.push({
    pickupLocation,
    dropoffLocation,
    description
  });

  console.log({
    pickupLocation,
    dropoffLocation,
    description
  })

  const routes: Array<RouteType> = [];
  // let lastLocation = null;

  for (let shipment of shipments) {
    const url = 'https://api.mapbox.com/optimized-trips/v1/mapbox' +
      '/driving' +
      `/${shipment.pickupLocation[0]},${shipment.pickupLocation[1]};${shipment.dropoffLocation[0]},${shipment.dropoffLocation[1]}` +
      '?source=first' +
      '&destination=last' +
      '&roundtrip=false' +
      '&geometries=geojson' +
      `&access_token=${process.env.MAPBOX_ACCESS_KEY}`
    ;
    
    await axios.get(url)
    .then(res => {
      routes.push({
        type: 'pickup',
        geojsonCoordinates: res.data.trips[0].geometry.coordinates
      })
    })
    .catch(err => console.log(err.message));
  }

  return {
    shipments,
    routes,
  };
};

export default addShipment;