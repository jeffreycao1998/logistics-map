import axios from "axios";
import fs from 'fs';
import { shipments } from "..";
import { ShipmentType } from "../types";

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

const initMatrix = (totalShipments: number) => {
  const matrix = [] as Array<Array<any>>;

  for (let i = 0; i < totalShipments; i++) {
    matrix.push([]);
  }

  return matrix;
};

let counter = 0;

const stallTime = (timeToDelay: number) => new Promise((resolve) => setTimeout(resolve, timeToDelay));

const createMatrix = async (shipments: Array<ShipmentType>) => {
  const waypoints = extractWaypoints(shipments);
  const matrix = initMatrix(shipments.length * 2) as Array<Array<any>>;

  for (let i = 0; i < waypoints.length; i++) {
    for (let j = 0; j < waypoints.length; j++) {
      const urlWaypoints = `${waypoints[i].location[0]},${waypoints[i].location[1]};${waypoints[j].location[0]},${waypoints[j].location[1]}`;
      const url = `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${urlWaypoints}?source=first&destination=last&roundtrip=false&geometries=geojson&access_token=${process.env.MAPBOX_ACCESS_KEY}`;
      await axios.get(url)
      .then(res => {
        matrix[i][j] = {
          from: [...waypoints[i].location],
          to: [...waypoints[j].location],
          distance: res.data.trips[0].distance,
          duration: res.data.trips[0].duration,
          coordinates: res.data.trips[0].geometry.coordinates
        }
      })
      .catch(err => console.log(err));
      
      counter += 1;
      console.log(counter)
      await stallTime(200);
    }
  };

  const data = JSON.stringify(matrix);
  fs.writeFileSync('testMatrix4Shipments', data);
  return matrix;
};

createMatrix(shipments);