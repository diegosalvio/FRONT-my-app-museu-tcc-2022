export interface Artifact {
  __id: string
  title: string
  date: string
  informationAbout: string
  importancyLevel: string
  artist: string
  museum: string
  image: string
  geolocation: {
    lat: number,
    lng: number
  }
}
