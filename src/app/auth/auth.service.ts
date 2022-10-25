import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from './user/user.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Login } from '../home/sign-up/user';

const url = environment.URL_BASE


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) { }

  auth(login: Login): Observable<HttpResponse<any>> {

    return this.httpClient
      .post(`${url}/person/login`,
        login,
        {
          observe: 'response'
        }
      )
      .pipe(
        tap(
          (res) => {
            const authToken = res.headers.get("x-access-token") ?? "";
            this.userService.savUserToken(authToken);
          }
        )
      );
  }

}

