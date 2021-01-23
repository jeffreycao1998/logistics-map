//////////////
////////////// Genetic Algorithm w/ Crossover
//////////////

// import axios from 'axios';
import { shipments } from '../index';
import matrix from './testMatrix6Shipments';
import { 
  ShipmentType,
  CombinationType,
  // RouteType 
} from '../types';
// import fetchGeoJsonV2 from './fetchGeoJsonV2';
// import util from 'util';
import { initIndexArray, shuffle, swap } from './helpers';

let highestFitness = 0;
let curDistance = Infinity;
let totalCombinations = 0;

const answerDistance = 191526.1;
const STARTING_POINT = 0; // starting point is the waypoint at index 0;

const POPULATION_SIZE = 12;
const MUTATION_RATE = 1;
// const CYCLES = 120;

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

const isValidSequence = (indexes: Array<number>) => {
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

const initPopulation = (indexes: Array<number>, populationSize: number, startingPoint: number) => {
  const population = [];

  while (population.length < populationSize) {
    const order = shuffle(indexes);

    if (order[0] !== startingPoint) continue;
    if (!isValidSequence(indexes)) continue;

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

    // Check if we found an improved fitness score
    if (combination.fitness > highestFitness) {
      highestFitness = combination.fitness;
      curDistance = combination.distance;
    }
    fitnessScores.push(combination);

    totalCombinations += 1;
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

// picks a random index weighted by fitness % compared to entire population
const pickOne = (population: Array<CombinationType>) => {
  let index = 0;
  let r = Math.random();

  while (r > 0) {
    r -= population[index].fitness;
    index++;
  }
  return { ...population[index - 1] };
};

const mutate = (order: Array<number>, mutationRate: number) => {
  // for (let i = 0; i < order.length; i++) {
  //   if (Math.random() < mutationRate) {
      const indexA = Math.floor(Math.random() * (order.length - 2)) + 1;
      const indexB = Math.floor(Math.random() * (order.length - 2)) + 1;
      swap(order, indexA, indexB);
    // }
  // }
};

const crossOver = (orderA: Array<number>, orderB: Array<number>, startingPoint: number) => {
  const start = Math.floor(Math.random() * (orderA.length - 2)) + 1;
  const end = Math.floor(Math.random() * (orderA.length - 2)) + 1;
  const newOrder = [startingPoint, ...orderA.slice(start, end)];

  for (let i = 1; i < orderB.length - 1; i++) {
    const waypointIndex = orderB[i];

    if (!newOrder.includes(waypointIndex)) {
      newOrder.push(waypointIndex);
    }
  }

  newOrder.push(startingPoint);
  return newOrder;
};

const nextGeneration = (population: Array<CombinationType>) => {
  const newPopulation = [];

  while (newPopulation.length < POPULATION_SIZE) {
    const combinationA = pickOne(population);
    const combinationB = pickOne(population);
    const mergedOrder = crossOver(combinationA.order, combinationB.order, STARTING_POINT);
    mutate(mergedOrder, MUTATION_RATE);

    if(!isValidSequence(mergedOrder)) continue;

    newPopulation.push({
      order: [...mergedOrder],
      distance: 0,
      fitness: 0
    });
  }
  return newPopulation;
};

const getAllTotalDistances = (shipments: Array<ShipmentType>) => {
  const startTime = (new Date).getTime();
  const waypoints = extractWaypoints(shipments);
  const indexesArray = initIndexArray(waypoints.length);
  let population = initPopulation(indexesArray, POPULATION_SIZE, STARTING_POINT);

  // for (let i = 0; i < CYCLES; i++) {
  //   const fitnessScores = getPopulationFitness(population);
  //   population = nextGeneration(fitnessScores, STARTING_POINT);
  // }

  while (curDistance !== answerDistance) {
    const fitnessScores = getPopulationFitness(population);
    population = nextGeneration(fitnessScores);
  }

  const endTime = (new Date).getTime();

  return {
    totalCombinations,
    distance: curDistance,
    duration: endTime - startTime
  }
};

getAllTotalDistances(shipments);

const REPS = 200;

let count = 0;
let sumCombinations = 0;
let sumDistance = 0;
let sumDuration = 0;

for (let i = 0; i < REPS; i++) {
  const result = getAllTotalDistances(shipments);
  count++;
  sumCombinations += result.totalCombinations;
  sumDistance += result.distance;
  sumDuration += result.duration;
 
  console.log('results', {
    count,
    sumCombinations,
    sumDistance,
    sumDuration
  })

  // reset
  highestFitness = 0;
  curDistance = Infinity;
  totalCombinations = 0;
}

console.log({
  combinations: sumCombinations / REPS,
  distance: sumDistance / REPS,
  duration: sumDuration / REPS
})