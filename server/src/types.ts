export type ShipmentType = {
  pickupLocation: [number, number]
  dropoffLocation: [number, number]
  description: string
}

export type RouteType = {
  type: 'pickup' | 'dropoff'
  sequence: number
  geojsonCoordinates: Array<[number, number]>
}