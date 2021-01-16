export type Shipment = {
  pickupLocation: [number, number]
  dropoffLocation: [number, number]
  description: string
}

export type Route = {
  type: 'pickup' | 'dropoff'
  geojsonCoordinates: Array<[number, number]>
}