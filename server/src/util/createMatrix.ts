import axios from "axios";
import { ShipmentType, MatrixValue } from "../types";
import getWaypoints from '../util/getWaypoints';
import fs from 'fs';
import { sleep } from '../util/helpers';

import cache from '../experiment/cache/10shipmentCache';
// const cache = [] as Array<MatrixValue>;

const initMatrix = (totalShipments: number) => {
  const matrix = [] as Array<Array<any>>;

  for (let i = 0; i < totalShipments; i++) {
    matrix.push([]);
  }
  return matrix;
};

const createMatrix = async (shipments: Array<ShipmentType>) => {
  const waypoints = getWaypoints(shipments);
  const matrix = initMatrix(shipments.length * 2) as Array<Array<any>>;

  for (let i = 0; i < waypoints.length; i++) {
    for (let j = 0; j < waypoints.length; j++) {
      const cachedValue = cache.filter((value: MatrixValue) => {
        return value.from[0] === waypoints[i].location[0] &&
          value.from[1] === waypoints[i].location[1] &&
          value.to[0] === waypoints[j].location[0] &&
          value.to[1] === waypoints[j].location[1];
      })[0];

      if (cachedValue) {  // check if these coordinates were previously computed
        matrix[i][j] = cachedValue;

      } else {
        const urlWaypoints = `${waypoints[i].location[0]},${waypoints[i].location[1]};${waypoints[j].location[0]},${waypoints[j].location[1]}`;
        const url = `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${urlWaypoints}?source=first&destination=last&roundtrip=false&geometries=geojson&access_token=${process.env.MAPBOX_ACCESS_KEY}`;
        await sleep(500);
        console.log(i, j);
        await axios.get(url)
        .then(res => {
          const value = {
            from: [...waypoints[i].location],
            to: [...waypoints[j].location],
            distance: res.data.trips[0].distance,
            duration: res.data.trips[0].duration,
            coordinates: res.data.trips[0].geometry.coordinates
          }
          matrix[i][j] = value;
          cache.push(value);
        })
        .catch(err => console.log(err));
      }
    }
  };
  fs.writeFileSync('10shipmentCache', JSON.stringify(cache));
  return matrix;
};

export default createMatrix;