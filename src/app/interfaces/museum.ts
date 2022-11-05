export interface Museums extends Array<Museum> { }

export interface Museum {
  _id?: string,
  name: string,
  document: string,
  numberOfArtifacts?: number,
  address: {
    CEP: string,
    address: string,
    numberAddress: string,
    districtAddress: string,
    complementAddress: string,
    cityAddress: string,
    stateAddress: string
  },
  description: string
}


