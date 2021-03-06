import { ShipmentType, CombinationType, MatrixValue } from '../types';
import { initIndexArray, shuffle, swap } from './helpers';
import getWaypoints from './getWaypoints';

let optimalDistance = 0;
let optimalSequence = [] as Array<number>;

// checks for correct starting point and makes sure dropoff points for a 
// specific shipment isn't visited before the corresponding pickup point
const isValidSequence = (indexes: Array<number>, startingPoint: number) => {
  const set = new Set();
  set.add(startingPoint);

  if (indexes[0] !== startingPoint) return false;

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
    order.push(order[0]);

    if(!isValidSequence(order, startingPoint)) continue;

    population.push({
      order,
      distance: 0,
      fitness: 0,
    });
  }
  return population;
};

const getPopulationFitness = (population: Array<CombinationType>, matrix: Array<Array<MatrixValue>>) => {
  const fitnessScores = [];
  let highestFitness = 0;

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
      optimalDistance = combination.distance;
      optimalSequence = combination.order;
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
  if (Math.random() < mutationRate) {
    const indexA = Math.floor(Math.random() * (order.length - 2)) + 1;
    const indexB = Math.floor(Math.random() * (order.length - 2)) + 1;
    swap(order, indexA, indexB);
  }
};

const crossOver = (orderA: Array<number>, orderB: Array<number>, startingPoint: number, crossOverRate: number) => {
  const start = Math.floor(Math.random() * (orderA.length - 2)) + 1;
  const end = Math.floor(Math.random() * (orderA.length - 2)) + 1;
  const newOrder = [startingPoint, ...orderA.slice(start, end)];

  if (Math.random() < crossOverRate) {
    for (let i = 1; i < orderB.length - 1; i++) {
      const waypointIndex = orderB[i];

      if (!newOrder.includes(waypointIndex)) {
        newOrder.push(waypointIndex);
      }
    }
    newOrder.push(startingPoint);
    return newOrder;
  } else {
    const isLeft = Math.random() < .5;

    return isLeft ? orderA : orderB;
  }
};

const nextGeneration = (population: Array<CombinationType>, mutationRate: number, populationSize: number, startingPoint: number, crossOverRate: number) => {
  const newPopulation = [];

  while (newPopulation.length < populationSize) {
    const combinationA = pickOne(population);
    const combinationB = pickOne(population);
    const mergedOrder = crossOver(combinationA.order, combinationB.order, startingPoint, crossOverRate);
    mutate(mergedOrder, mutationRate);

    if(!isValidSequence(mergedOrder, startingPoint)) continue;
    
    newPopulation.push({
      order: [...mergedOrder],
      distance: 0,
      fitness: 0
    });
  }
  return newPopulation;
};

const calculateOptimalSequence = (shipments: Array<ShipmentType>, matrix: Array<Array<MatrixValue>>, startingPoint: number) => {
  const startTime = (new Date).getTime();

  const waypoints = getWaypoints(shipments);
  const indexesArray = initIndexArray(waypoints.length);

  const populationSize = waypoints.length * 12;
  const maxCycles = 500;
  let mutationRate = .03;
  let crossOverRate = 0.3;

  let population = initPopulation(indexesArray, populationSize, startingPoint);
  for (let i = 0; i < maxCycles; i++) {
    const fitnessScores = getPopulationFitness(population, matrix);
    population = nextGeneration(fitnessScores, mutationRate, populationSize, startingPoint, crossOverRate);
  }

  console.log('Optimal Sequence: ', optimalSequence);
  console.log('Optimal Distance: ', optimalDistance);
  console.log('Run duration: ', (new Date).getTime() - startTime);

  return optimalSequence;
};

export default calculateOptimalSequence;