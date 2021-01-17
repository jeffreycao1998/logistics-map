export type ShipmentType = {
  id: string
  pickupLocation: [number, number, number]
  dropoffLocation: [number, number, number]
  description: string
}

export type RouteType = {
  id: string
  type: 'pickup' | 'dropoff'
  sequence: number
  geojsonCoordinates: Array<[number, number]>
}