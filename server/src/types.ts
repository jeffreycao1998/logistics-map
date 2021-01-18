export type ShipmentType = {
  id: string
  pickupLocation: Array<number>
  dropoffLocation: Array<number>
  description: string
}

export type RouteType = {
  id: string
  type: 'pickup' | 'dropoff'
  sequence: number
  geojsonCoordinates: Array<[number, number]>
}