export type Viewport = {
  longitude: number
  latitude: number
  zoom: number
}

export type Waypoint = [number, number]

export type Waypoints = Array<Waypoint>

export type Shipment = {
  id: string
  pickup: {
    lng: string
    lat: string
  }
  dropoff: {
    lng: string
    lat: string
  }
  description: string
}