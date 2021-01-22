//////////////
////////////// BRUTE FORCE ALGORITHM (does not scale very well at all)
//////////////

// import axios from 'axios';
import { shipments, startTime } from '../index';
import matrix from './testMatrix';
import { 
  ShipmentType,
  // RouteType 
} from '../types';
// import fetchGeoJsonV2 from './fetchGeoJsonV2';
// import util from 'util';
import { initIndexArray, swap } from './helpers';

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

// const initMatrix = (totalShipments: number) => {
//   const matrix = [] as Array<Array<any>>;

//   for (let i = 0; i < totalShipments; i++) {
//     matrix.push([]);
//   }

//   return matrix;
// };

// const createMatrix = async (shipments: Array<ShipmentType>) => {
//   const waypoints = extractWaypoints(shipments);
//   const matrix = initMatrix(shipments.length * 2) as Array<Array<any>>;

//   for (let i = 0; i < waypoints.length; i++) {
//     for (let j = 0; j < waypoints.length; j++) {
//       const urlWaypoints = `${waypoints[i].location[0]},${waypoints[i].location[1]};${waypoints[j].location[0]},${waypoints[j].location[1]}`;
//       const url = `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${urlWaypoints}?source=first&destination=last&roundtrip=false&geometries=geojson&access_token=${process.env.MAPBOX_ACCESS_KEY}`;
//       await axios.get(url)
//       .then(res => {
//         matrix[i][j] = {
//           from: [...waypoints[i].location],
//           to: [...waypoints[j].location],
//           distance: res.data.trips[0].distance,
//           duration: res.data.trips[0].duration,
//           coordinates: res.data.trips[0].geometry.coordinates
//         }
//       })
//       .catch(err => console.log(err));
//     }
//   };

//   return matrix;
// };

export const getAllCombinations = (indexes: Array<number>, currentIndex: number, combinations = [] as Array<Array<number>>) => {
  if (currentIndex === indexes.length - 1) {
    combinations.push([...indexes]);
  }

  for (let i = currentIndex; i < indexes.length; i++) {
    swap(indexes, currentIndex, i);
    getAllCombinations(indexes, currentIndex + 1, combinations);
    swap(indexes, currentIndex, i);
  }

  return combinations;
};

const getAllTotalDistances = async (shipments: Array<ShipmentType>) => {
  // const matrix = await createMatrix(shipments);
  const waypoints = extractWaypoints(shipments);
  const indexesArray = initIndexArray(waypoints.length);

  const combinations = getAllCombinations(indexesArray, 0, []);

  let shortestDistanceCombination = null;
  let shortestDistance = Infinity;

  for (let combination of combinations) {
    let lastIndex = null;
    let totalDistance = 0;
    combination.push(combination[0]);

    // skip combination if combination doesn't start where we want it to start
    const startingPoint = 0;
    if (combination[0] !== startingPoint) {
      continue;
    }

    for (let index of combination) {
      if (lastIndex === null) {
        lastIndex = index;
        continue;
      }

      const distance = matrix[lastIndex][index].distance;
      totalDistance += distance;
      lastIndex = index;
    }

    if (totalDistance < shortestDistance) {
      shortestDistanceCombination = combination;
      shortestDistance = totalDistance;
    }
  }

  const endTime = (new Date).getTime();

  console.log({
    shortestDistanceCombination,
    shortestDistance,
    algorithmDurationMs: endTime - startTime
  });
};

getAllTotalDistances(shipments);