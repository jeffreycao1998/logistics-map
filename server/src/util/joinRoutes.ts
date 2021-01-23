import shortid from 'shortid';
import { MatrixValue, RouteType } from "../types";

const joinRoutes = (matrix: Array<Array<MatrixValue>>, sequence: Array<number>) => {
  let lastIndex = null;
  const routes = [] as Array<RouteType>;

  for (let index of sequence) {
    // need 2 indexes to get a distance
    if (lastIndex === null) {
      lastIndex = index;
      continue;
    }

    const newRoute: RouteType = {
      id: `route-${shortid.generate()}`,
      type: index === sequence[0] ? 'recall' : index % 2 === 1 ? 'dropoff' : 'pickup',
      sequence: routes.length,
      geojsonCoordinates: matrix[lastIndex][index].coordinates as [number, number][]
    }

    routes.push(newRoute);

    lastIndex = index;
  }
  return routes;
};

export default joinRoutes;