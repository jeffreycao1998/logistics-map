import calculateOptimalSequence from '../util/calcOptimalSequence';
import { shipments } from '../index';
import matrix from './matrix/testMatrix10Shipments';

const calculateAverage = () => {
  const REPS = 10;

  let count = 0;
  let sumCombinations = 0;
  let sumDistance = 0;
  let sumDuration = 0;

  for (let i = 0; i < REPS; i++) {
    const result = calculateOptimalSequence(shipments, matrix, 0);
    count++;
    sumCombinations += result.totalCombinations;
    sumDistance += result.distance;
    sumDuration += result.duration;
  
    console.log('results', {
      count,
      sumCombinations,
      sumDistance,
      sumDuration
    });
  }

  console.log({
    combinations: sumCombinations / REPS,
    distance: sumDistance / REPS,
    duration: sumDuration / REPS
  })
};

calculateAverage();