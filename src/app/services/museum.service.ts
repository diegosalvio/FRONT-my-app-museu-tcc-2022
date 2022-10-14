import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, pluck, tap } from 'rxjs';
import { Artifact } from '../interfaces/artifact';
import { Artist } from '../interfaces/artist';
import { Museums } from '../interfaces/museum';

const API_URL = "http://localhost:3001/api/v1/museum"

@Injectable({
  providedIn: 'root'
})
export class MuseumService {

  artifactModel: any
  museumModel: any
  artistModel: any

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllMuseums(): Observable<Museums> {
    const res = this.httpClient.get<Museums>(API_URL).pipe(
      map((resp => {
        this.museumModel = resp
        return resp
      })),
      tap(resp => console.log("TAP: ", resp))
    )

    return res

  }

  getAllArtifactsFromMuseum(idMuseum: string) {
    const res = this.httpClient.get(`${API_URL}/${idMuseum}/artifacts`).pipe(
      map((resp => {
        this.artifactModel = resp
      })),
      tap(resp => console.log("TAP0: ", resp)),
    )
    return res
  }

  getLevel3ArtifactsFromMuseum(idMuseum: string) {
    const res = this.httpClient.get(`${API_URL}/${idMuseum}/artifacts3`).pipe(
      map((resp => {
        this.artifactModel = resp
      })),
      tap(resp => console.log("TAP1: ", resp)),
    )
    return res
  }

  getLevel2ArtifactsFromMuseum(idMuseum: string) {
    const res = this.httpClient.get(`${API_URL}/${idMuseum}/artifacts2`).pipe(
      map((resp => {
        this.artifactModel = resp
      })),
      tap(resp => console.log("TAP2: ", resp)),
    )
    return res
  }

  getOneArtist(idArtist: string): Observable<Artist> {
    return this.httpClient.get<Artist>(`${API_URL}/artist/${idArtist}`).pipe(
      map((resp => {
        this.artistModel = resp
        return resp
      })),
      tap(resp => console.log("Artist Object: ", resp))
    )
  }
}
