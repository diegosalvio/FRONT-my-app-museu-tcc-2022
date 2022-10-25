import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { TokenService } from '../token.service';
import { User, UserInfo } from './user';
import { HttpClient } from '@angular/common/http';
import { EditedUser } from 'src/app/home/sign-up/user';

const url = environment.URL_BASE
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>({})

  private token!: any

  constructor(
    private tokenService: TokenService,
    private http: HttpClient,
  ) {
    if (this.tokenService.hasToken()) {
      this.decodeJWT()
    }
  }

  private decodeJWT() {
    const token = this.tokenService.getToken();
    const user = jwt_decode(token) as User;
    this.userSubject.next(user);
  }

  returnUser(): Observable<User> {
    const res = this.userSubject.asObservable();
    return res
  }

  savUserToken(token: string) {
    this.tokenService.savToken(token)
    this.decodeJWT()
  }

  logout() {
    this.tokenService.deleteToken();
    this.userSubject.next({});
  }

  isLoggedIn(): boolean {
    const res = this.tokenService.hasToken();
    return res
  }

  getUser(id: number | undefined): Observable<UserInfo> {
   return this.http.get<UserInfo>(`${url}/person/${id}`)
  }

  updateUser(id: number | undefined, editedUser: EditedUser) {
    console.log("no serviço: ", editedUser)
    return this.http.patch(`${url}/person/update/${id}`, editedUser)
  }

  deleteUser(id: number | undefined) {
    return this.http.delete(`${url}/person/delete/${id}`)
  }
}
