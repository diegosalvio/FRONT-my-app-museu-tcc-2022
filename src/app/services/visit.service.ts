import { Visitation } from './../interfaces/visitation';
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

  newVisit(idMuseum: string | undefined, visitation: Visitation): Observable<Visitation> {
    return this.httpClient.post<Visitation>(`/museum/register/visitation/${idMuseum}`, visitation)
  }
}
