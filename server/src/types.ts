export type ShipmentType = {
  pickupLocation: [number, number]
  dropoffLocation: [number, number]
  description: string
}

export type RouteType = {
  type: 'pickup' | 'dropoff'
  geojsonCoordinates: Array<[number, number]>
}