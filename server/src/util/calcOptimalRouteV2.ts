//////////////
////////////// BRUTE FORCE ALGORITHM (does not scale very well at all)
//////////////

// import axios from 'axios';
// import fs from 'fs';
import { 
  shipments,
  startTime 
} from '../index';
import matrix from './testMatrix2Shipments';
import { 
  ShipmentType,
} from '../types';
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
      console.log(shortestDistance);
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