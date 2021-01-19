import axios from 'axios';
import { shipments } from '../index';
import { ShipmentType, RouteType } from '../types';
import fetchGeoJsonV2 from './fetchGeoJsonV2';

const extractWaypoints = (shipments: Array<ShipmentType>) => {
  const waypoints = [];

  for (let shipment of shipments) {
    waypoints.push({
      id: shipment.id,
      type: 'pickup',
      location: shipment.pickupLocation
    });
    waypoints.push({
      id: shipment.id,
      type: 'dropoff',
      location: shipment.dropoffLocation
    });
  }

  return waypoints;
};

const initMatrix = (totalShipments: number) => {
  const matrix = [] as Array<Array<any>>;

  for (let i = 0; i < totalShipments; i++) {
    matrix.push([]);
  }

  return matrix;
};

const createMatrix = async (shipments: Array<ShipmentType>) => {
  const waypoints = extractWaypoints(shipments);
  const matrix = initMatrix(shipments.length * 2) as Array<Array<any>>;

  for (let i = 0; i < waypoints.length; i++) {
    for (let j = 0; j < waypoints.length; j++) {
      if (i === j) {
        matrix[i][j] = 0;
      }
      const urlWaypoints = `${waypoints[i].location[0]},${waypoints[i].location[1]};${waypoints[j].location[0]},${waypoints[j].location[1]}`;
      const url = `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${urlWaypoints}?source=first&destination=last&roundtrip=false&geometries=geojson&access_token=${process.env.MAPBOX_ACCESS_KEY}`;
      await axios.get(url)
      .then(res => {
        console.log(res.data);
        matrix[i][j] = {

        }
      })
      .catch(err => console.log(err));
    }
  };

  console.log(matrix);
};

createMatrix(shipments);

const calcOptimalRoute = async (shipments: Array<ShipmentType>) => {
  const lastLocation = [] as Array<number>;
  const routes = [] as Array<RouteType>;

  for (let shipment of shipments) {

    if (lastLocation.length > 0) {
      // add route to pickup zone
      const waypoints = `${lastLocation[0]},${lastLocation[1]};${shipment.pickupLocation[0]},${shipment.pickupLocation[1]}`;
      const url = `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${waypoints}?source=first&destination=last&roundtrip=false&geometries=geojson&access_token=${process.env.MAPBOX_ACCESS_KEY}`;
      await fetchGeoJsonV2(url, routes, lastLocation, 'pickup', shipment);
    }
    
    // add route to dropoff zone
    const waypoints = `${shipment.pickupLocation[0]},${shipment.pickupLocation[1]};${shipment.dropoffLocation[0]},${shipment.dropoffLocation[1]}`;
    const url = `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${waypoints}?source=first&destination=last&roundtrip=false&geometries=geojson&access_token=${process.env.MAPBOX_ACCESS_KEY}`;
    await fetchGeoJsonV2(url, routes, lastLocation, 'dropoff', shipment);
  }

  // add route back to starting point
  const waypoints = `${lastLocation[0]},${lastLocation[1]};${shipments[0].pickupLocation[0]},${shipments[0].pickupLocation[1]}`;
  const url = `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${waypoints}?source=first&destination=last&roundtrip=false&geometries=geojson&access_token=${process.env.MAPBOX_ACCESS_KEY}`;
  await fetchGeoJsonV2(url, routes, lastLocation, 'recall');

  return routes;
};



export default calcOptimalRoute;