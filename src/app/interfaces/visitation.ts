import { Artifact } from "./artifact";

export interface Visitation {
  typeVisit: TypeVisit,
  visitationList: VisitationList
}

export interface TypeVisit {
  _id: string,
  type: string,
  artifactList: [string]
  museum: string
}

export interface VisitationList extends Array<Artifact> {
}
