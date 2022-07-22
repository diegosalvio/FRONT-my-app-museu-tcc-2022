import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { Login } from '../sign-up/user';
import { Observable } from 'rxjs';

const url = environment.URL_BASE

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  hide = true

  constructor(
    private http: HttpClient
  ) { }

  postLogin(login: Login): Observable<Login> {
    console.log(login)

    return this.http.post<Login>(`${url}/person/login`, login)
  }
}
