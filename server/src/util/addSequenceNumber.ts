import { ShipmentType } from "../types";

const addSequenceNumber = (shipments: Array<ShipmentType>, sequence: Array<number>, startingPoint: number) => {
  for (let i = 1; i < sequence.length - 1; i++) {
    const shipmentIndex = Math.floor(sequence[i] / 2);

    if (sequence[i] % 2 === 0) {  // pickup index
      shipments[shipmentIndex].pickupLocation[2] = i;
    } else if (sequence[i] % 2 === 1) { // dropoff index
      shipments[shipmentIndex].dropoffLocation[2] = i;
    }
  }

  shipments[startingPoint].pickupLocation[2] = 0;
};

export default addSequenceNumber;