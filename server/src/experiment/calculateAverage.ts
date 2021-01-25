import calculateOptimalSequence from './calcOptimalSequence';
import shipments from './testShipments';
import matrix from './matrix/testMatrix10Shipments';
import { MatrixValue, ShipmentType } from '../types';

const calculateAverage = (shipments: Array<ShipmentType>, matrix: Array<Array<MatrixValue>>) => {
  const REPS = 100;

  let correctAnswers = 0;

  let count = 0;
  let sumCombinations = 0;
  let sumDistance = 0;
  let sumDuration = 0;

  for (let i = 0; i < REPS; i++) {
    const result = calculateOptimalSequence(shipments, matrix, 0);
    count++;

    if (result.distance === 191526.1) {
    // if (result.distance === 190908.6 * 1.05) {
      correctAnswers += 1;
    }

    sumCombinations += result.totalCombinations;
    sumDistance += result.distance;
    sumDuration += result.duration;
  
    console.log(count);
    // console.log('results', {
    //   count,
    //   sumCombinations,
    //   sumDistance,
    //   sumDuration
    // });
  }

  console.log({
    combinations: sumCombinations / REPS,
    distance: sumDistance / REPS,
    duration: sumDuration / REPS,
  })
  console.log(`${correctAnswers}/${REPS} were correct`)
};

// 10 shipments
// calculateAverage(shipments, matrix);

calculateAverage(shipments.slice(0,10), matrix);