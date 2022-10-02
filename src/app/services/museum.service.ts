import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, pluck, tap } from 'rxjs';
import { Artifact } from '../interfaces/artifact';
import { Museums } from '../interfaces/museum';

const API_URL = "http://localhost:3001/api/v1/museum"

@Injectable({
  providedIn: 'root'
})
export class MuseumService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllMuseums(): Observable<Museums> {
    const res = this.httpClient.get<Museums>(API_URL).pipe(
      map((resp => {
        return resp
      })),
      tap(resp => console.log("TAP: ", resp))
    )

    return res

  }

  getAllArtifactsFromMuseum(idMuseum: string) {
    const res = this.httpClient.get(`${API_URL}/${idMuseum}/artifacts`).pipe(
      tap(resp => console.log("TAP0: ", resp)),
    )
    return res
  }

  getLevel3ArtifactsFromMuseum(idMuseum: string) {
    const res = this.httpClient.get(`${API_URL}/${idMuseum}/artifacts3`).pipe(
      tap(resp => console.log("TAP1: ", resp)),
    )
    return res
  }

  getLevel2ArtifactsFromMuseum(idMuseum: string) {
    const res = this.httpClient.get(`${API_URL}/${idMuseum}/artifacts2`).pipe(
      tap(resp => console.log("TAP2: ", resp)),
    )
    return res
  }
/*
  getAllArtistsFromMuseum() {

  } */

}
