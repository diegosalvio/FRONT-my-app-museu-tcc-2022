import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { TokenService } from '../token.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>({})

  constructor(
    private tokenService: TokenService,
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
}
