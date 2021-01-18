import { ShipmentType } from "../types";

const checkDuplicateShipment = (shipments: Array<ShipmentType>, { pickupLocation, dropoffLocation, description }: ShipmentType) => {
  const identicalRoute = shipments.filter((shipment: ShipmentType) => {
    return shipment.pickupLocation[0] === pickupLocation[0] &&
      shipment.pickupLocation[1] === pickupLocation[1] &&
      shipment.dropoffLocation[0] === dropoffLocation[0] &&
      shipment.dropoffLocation[1] === dropoffLocation[1] &&
      shipment.description === description;
  }).length > 0;

  return identicalRoute;
};

export default checkDuplicateShipment;