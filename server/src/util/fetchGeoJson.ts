import axios from 'axios';
import shortid from 'shortid';
import { RouteType, ShipmentType } from '../types';

const fetchGeoJson = async (url: string, routes: Array<RouteType>, lastLocation: Array<number>, type: 'pickup' | 'dropoff', shipment: ShipmentType) => {
  await axios.get(url)
  .then(res => {
    const geojsonCoordinates = res.data.trips[0].geometry.coordinates;

    const newRoute = {
      id: `route-${shortid.generate()}`,
      type,
      sequence: routes.length,
      geojsonCoordinates
    };
    routes.push(newRoute);

    // set the longitude/latitude of the last location you were at
    lastLocation[0] = geojsonCoordinates[geojsonCoordinates.length - 1][0];
    lastLocation[1] = geojsonCoordinates[geojsonCoordinates.length - 1][1];
  })
  .catch(err => console.log(err.message));
};

export default fetchGeoJson;