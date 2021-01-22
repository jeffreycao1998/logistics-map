//////////////
////////////// Genetic Algorithm
//////////////

// import axios from 'axios';
import { shipments, startTime } from '../index';
import matrix from './testMatrix';
import { 
  ShipmentType,
  // RouteType 
} from '../types';
// import fetchGeoJsonV2 from './fetchGeoJsonV2';
import { initIndexArray, generatePopulation } from './helpers';

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

const getAllTotalDistances = async (shipments: Array<ShipmentType>) => {
  const waypoints = extractWaypoints(shipments);
  const indexesArray = initIndexArray(waypoints.length);

  const population = generatePopulation(indexesArray, 10);

  const endTime = (new Date).getTime();

  console.log({
    population,
    matrixLength: matrix.length,
    algorithmDurationMs: endTime - startTime
  });
};

getAllTotalDistances(shipments);