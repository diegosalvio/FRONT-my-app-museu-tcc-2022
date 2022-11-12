import { NewVisitation, Visitation } from './../interfaces/visitation';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Artifact } from '../interfaces/artifact';
import { Observable } from 'rxjs';

const url = environment.URL_MUSEUM

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  constructor(
    private httpClient: HttpClient
  ) { }

  newVisit(idMuseum: string | undefined, visitation: NewVisitation): Observable<NewVisitation> {
    return this.httpClient.post<NewVisitation>(`${url}/museum/register/visitation/${idMuseum}`, visitation)
  }

  getVisitationList(idMuseum: string | undefined, type: string) {
    return this.httpClient.get<Visitation>(`${url}/museum/visitation/${type}/${idMuseum}`)
  }

  updateVisit(id: string | undefined, editedVisitation: NewVisitation): Observable<NewVisitation> {
    return this.httpClient.patch<NewVisitation>(`${url}/museum/update/visitation/${id}`, editedVisitation)
  }
}
