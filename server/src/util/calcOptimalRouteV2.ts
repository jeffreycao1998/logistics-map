//////////////
////////////// BRUTE FORCE ALGORITHM (does not scale very well at all)
//////////////

import { 
  shipments,
  startTime 
} from '../index';
import matrix from './testMatrix2Shipments';
import { 
  ShipmentType,
} from '../types';
import { initIndexArray, swap } from './helpers';

const STARTING_POINT = 0;

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

const checkValidSequence = (indexes: Array<number>) => {
  const set = new Set();
  set.add(STARTING_POINT);

  for (let i = 1; i < indexes.length; i++) {
    // is a pickup location so just add it to the set
    if (indexes[i] % 2 === 0) {
      set.add(indexes[i]);

    // is a dropoff location so check if it was picked up first
    } else if (indexes[i] % 2 === 1 && !set.has(indexes[i] - 1)) {
      return false;
    }
  }

  return true;
};

let totalCombinations = 0;

export const getAllCombinations = (indexes: Array<number>, currentIndex: number, combinations = [] as Array<Array<number>>) => {
  if (currentIndex === indexes.length - 1) {
    if (indexes[0] !== STARTING_POINT) return;
    if (!checkValidSequence(indexes)) return;

    totalCombinations += 1;

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

  // @ts-ignore
  for (let combination of combinations) {
    let lastIndex = null;
    let totalDistance = 0;
    combination.push(combination[0]);

    // skip combination if combination doesn't start where we want it to start

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
      console.log(shortestDistance);
    }
  }

  const endTime = (new Date).getTime();

  console.log({
    totalCombinations,
    shortestDistanceCombination,
    shortestDistance,
    algorithmDurationMs: endTime - startTime
  });
};

getAllTotalDistances(shipments);