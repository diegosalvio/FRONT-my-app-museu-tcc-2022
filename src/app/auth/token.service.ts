import { Injectable } from '@angular/core';

const KEY = "token"

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getToken(): string {
    const res = localStorage.getItem(KEY) ?? "";
    return res;
  }

  savToken(token: string): void {
    localStorage.setItem(KEY, token);
  }

  deleteToken(): void {
    localStorage.removeItem(KEY);
  }

  hasToken(): boolean {
    const res = !!this.getToken()
    return res;
  }
}
