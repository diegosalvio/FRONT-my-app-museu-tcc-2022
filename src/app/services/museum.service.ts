import { Visitation } from './../interfaces/visitation';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, pluck, tap, debounceTime } from 'rxjs';
import { Artifact } from '../interfaces/artifact';
import { Artist } from '../interfaces/artist';
import { Museums, Museum } from '../interfaces/museum';
import { environment } from 'src/environments/environment';

const API_URL = environment.URL_MUSEUM

@Injectable({
  providedIn: 'root'
})
export class MuseumService {

  artifactModel: any
  museumModel: any
  artistModel: any
  visitationModel: any
  index!: number
  showReturn: boolean = false

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllMuseums(): Observable<Museums> {
    const res = this.httpClient.get<Museums>(`${API_URL}/museum`).pipe(
      map((resp => {
        this.museumModel = resp
        return resp
      })),
      tap(resp => console.log("TAP: ", resp))
    )

    return res

  }

  getOneMuseumByName(name: string | undefined) {
    return this.httpClient.get<Museum>(`${API_URL}/museum/${name}`).pipe(
      tap(res => {
        console.log(res)
      })
    )
  }

  getAllArtifactsFromMuseum(idMuseum: string) {
    const res = this.httpClient.get(`${API_URL}/${idMuseum}/museum/artifacts`).pipe(
      map((resp => {
        this.artifactModel = resp
      })),
      tap(resp => console.log("TAP0: ", resp)),
    )
    return res
  }

  getOneArtist(idArtist: string | undefined): Observable<Artist> {
    return this.httpClient.get<Artist>(`${API_URL}/museum/artist/${idArtist}`).pipe(
      map((resp => {
        this.artistModel = resp
        return resp
      })),
      tap(resp => console.log("Artist Object: ", resp))
    )
  }

  getVisitation(idMuseum: string | undefined, type: string) {
    return this.httpClient.get<Visitation>(`${API_URL}/museum/visitation/${type}/${idMuseum}`).pipe(
      map(resp => {
        this.visitationModel = resp.typeVisit
        this.artifactModel = resp.visitationList
      }),
    )
  }

  getOneArtifact(id: string): Observable<Artifact> {
    return this.httpClient.get<Artifact>(`${API_URL}/museum/artifact/${id}`).pipe(
      tap(() => console.log)
    )
  }

  newMuseum(museum: Museum) {
    return this.httpClient.post<Museum>(`${API_URL}/museum/register`, museum).pipe(
      tap((res) => console.log("Museu criado: ", res))
    )
  }

  updateMuseum(id: string | undefined, museum: Museum) {
    return this.httpClient.patch(`${API_URL}/museum/update/${id}`, museum)
  }

  deleteMuseum(id?: string): Observable<Museum> {
    return this.httpClient.delete<Museum>(`${API_URL}/museum/delete/${id}`)
  }
}
