export interface Museums extends Array<Museum>{}

export interface Museum {
  _id: string,
  name: string,
  document: string,
  numberOfArtifacts: number,
  address: string,
  description: string
}


