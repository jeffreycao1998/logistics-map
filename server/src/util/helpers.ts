export const swap = (array: Array<number>, i: number, j: number) => {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
};

export const initIndexArray = (num: number) => {
  const indexes = [];

  for (let i = 0; i < num; i++) {
    indexes.push(i);
  }

  return indexes;
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

export const shuffle = (arr: Array<number>) => {
  var i = arr.length, j, temp;
  while(--i > 0){
    j = Math.floor(Math.random()*(i+1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return [...arr];
}