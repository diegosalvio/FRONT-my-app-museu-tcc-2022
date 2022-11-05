import { Observable } from 'rxjs';
import { Artifact } from './../interfaces/artifact';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const url = environment.URL_MUSEUM

@Injectable({
  providedIn: 'root'
})
export class ArtifactService {

  constructor(
    private httpClient: HttpClient
  ) { }


  newArtifact(artifact: Artifact) {
    return this.httpClient.post<Artifact>(`${url}/museum/register-artifact/${artifact.museum}/${artifact.artist}`, artifact)
  }

  getArtifact(id: string) {
    return this.httpClient.get<Artifact>(`${url}/museum/artifact/${id}`)
  }

  getAllArtifactsFromMuseum(idMuseum?: string) {
    return this.httpClient.get<Artifact[]>(`${url}/museum/${idMuseum}/artifacts`)

  }

  updateArtifact(id: string, artifact: Artifact) {
    return this.httpClient.patch<Artifact>(`${url}/museum/artifact/update/${id}`, artifact)
  }

  deleteArtifact(id: string | undefined): Observable<Artifact> {
    return this.httpClient.delete<Artifact>(`${url}/museum/artifact/delete/${id}`)
  }

}
