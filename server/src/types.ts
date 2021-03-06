export type ShipmentType = {
  id: string
  pickupLocation: Array<number>
  dropoffLocation: Array<number>
  description: string
}

export type RouteType = {
  id: string
  type: 'pickup' | 'dropoff' | 'recall'
  sequence: number
  geojsonCoordinates: Array<[number, number]>
}

export type CombinationType = {
  order: Array<number>
  distance: number
  fitness: number
}

export type MatrixValue = {
  from: number[]
  to: number[]
  distance: number
  duration: number
  coordinates: Array<Array<number>>
}