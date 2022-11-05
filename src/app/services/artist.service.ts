import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Artist } from '../interfaces/artist';

const url = environment.URL_MUSEUM


@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(
    private httpClient: HttpClient
  ) { }

  newArtist(artist: Artist) {
    return this.httpClient.post<Artist>(`${url}/museum/register-artist`, artist)
  }

  getArtists(idMuseum?: string) {
    return this.httpClient.get<Artist[]>(`${url}/museum/${idMuseum}/artists`).pipe(
      tap(res => console.log(res))
    )
  }

  getArtist(id: string) {
    return this.httpClient.get<Artist>(`${url}/museum/artist/${id}`)
  }

  updateArtist(id: string, artist: Artist) {
    return this.httpClient.patch<Artist>(`${url}/museum/artist/update/${id}`, artist)
  }

  deleteArtist(id: string): Observable<Artist> {
    return this.httpClient.delete<Artist>(`${url}/museum/artist/delete/${id}`)
  }
}
