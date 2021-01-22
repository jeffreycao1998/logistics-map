//////////////
////////////// Genetic Algorithm
//////////////

// import axios from 'axios';
import { shipments, startTime } from '../index';
import matrix from './testMatrix';
import { 
  ShipmentType,
  CombinationType,
  // RouteType 
} from '../types';
// import fetchGeoJsonV2 from './fetchGeoJsonV2';
// import util from 'util';
import { initIndexArray, shuffle, swap } from './helpers';

let highestFitness = 0;

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

const initPopulation = (index: Array<number>, populationSize: number, startingPoint: number) => {
  const population = [];

  while (population.length < populationSize) {
    const order = shuffle(index);

    if (order[0] !== startingPoint) {
      continue;
    }

    order.push(order[0]);
    population.push({
      order,
      distance: Infinity,
      fitness: 0,
    });
  }

  return population;
};

const getPopulationFitness = (population: Array<CombinationType>) => {
  const fitnessScores = [];

  for (let combination of population) {
    let lastIndex = null;
    let totalDistance = 0;

    for (let index of combination.order) {
      // need 2 indexes to get a distance
      if (lastIndex === null) {
        lastIndex = index;
        continue;
      }

      const distance = matrix[lastIndex][index].distance;
      totalDistance += distance;
      lastIndex = index;
    }

    combination.distance = totalDistance;
    combination.fitness = 1 / (totalDistance + 1);

    if (combination.fitness > highestFitness) {
      console.log(combination);
      highestFitness = combination.fitness;
    }
    fitnessScores.push(combination);
  }

  // calculate total fitness
  const totalFitness = fitnessScores.reduce((total: number, combination: CombinationType) => {
    return total + combination.fitness;
  },0);

  // make fitness score a percentage out of 1
  const normalizedFitnessScores = population.map((combination: CombinationType) => {
    return {
      ...combination,
      fitness: combination.fitness / totalFitness
    };
  });

  return normalizedFitnessScores;
};

const pickOne = (population: Array<CombinationType>) => {
  let index = 0;
  let r = Math.random();

  while (r > 0) {
    r -= population[index].fitness;
    index++;
  }
  return { ...population[index - 1] };
};

const mutate = (order: Array<number>) => {
  const indexA = Math.floor(Math.random() * (order.length - 2)) + 1;
  const indexB = Math.floor(Math.random() * (order.length - 2)) + 1;
  swap(order, indexA, indexB);
};

const nextGeneration = (population: Array<CombinationType>) => {
  const newPopulation = [];

  for (let i = 0; i < population.length; i++) {
    const combination = pickOne(population);
    mutate(combination.order);
    newPopulation[i] = {
      order: [...combination.order],
      distance: 0,
      fitness: 0
    }
  }
  return newPopulation;
};

const getAllTotalDistances = async (shipments: Array<ShipmentType>) => {
  const STARTING_POINT = 0; // starting point is the waypoint at index 0;
  const POPULATION_SIZE = 10;
  const CYCLES = 5;

  const waypoints = extractWaypoints(shipments);
  const indexesArray = initIndexArray(waypoints.length);
  let population = initPopulation(indexesArray, POPULATION_SIZE, STARTING_POINT);

  for (let i = 0; i < CYCLES; i++) {
    const fitnessScores = getPopulationFitness(population);
    population = nextGeneration(fitnessScores);
  }

  const endTime = (new Date).getTime();

  console.log({
    matrixLength: matrix.length,
    algorithmDurationMs: endTime - startTime
  });
};

getAllTotalDistances(shipments);