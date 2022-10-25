import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { Login, User } from '../sign-up/user';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from 'src/app/auth/user/user.service';

const url = environment.URL_BASE

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  hide = true

  user!: User | null

  token: any

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  postLogin(login: Login): Observable<HttpResponse<User>> {
    const res = this.http.post<User>(`${url}/person/login`, login, { observe: 'response' })
      .pipe(
        /* tap((res) => {
          this.user = res.body
        }), */
        tap(
          (res) => {
            const authToken = res.headers.get("x-access-token") ?? "";
            this.token = authToken
            this.userService.savUserToken(authToken);
          }
        )
      )
    return res
  }
}
