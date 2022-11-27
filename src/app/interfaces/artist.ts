export interface Artist {
  _id?: string,
  name: string,
  birthDate: Date,
  informationAbout: string,
  portrait: string,
  museum?: string | undefined
}
