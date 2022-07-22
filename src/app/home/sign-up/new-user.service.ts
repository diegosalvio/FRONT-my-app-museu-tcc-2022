import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { User } from './user';
import { environment } from '../../../environments/environment'

const url = environment.URL_BASE

@Injectable({
  providedIn: 'root'
})
export class NewUserService {

  constructor(
    private http: HttpClient,
  ) { }

  addNewUser(newUser: User): Observable<User> {

    return this.http.post<User>(`${url}/person/register`, newUser)
  }

  teste() {
    return this.http.get('http://localhost:3000', {observe: 'response'})
  }
}
