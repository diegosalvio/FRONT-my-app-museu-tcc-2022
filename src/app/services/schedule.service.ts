import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Schedule } from '../interfaces/schedule';

const url = environment.URL_MUSEUM

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    private http: HttpClient
  ) { }

  toSchedule(id: string | undefined, schedule: Schedule) {
    return this.http.patch<Schedule>(`${url}/museum/patch-schedule/${id}`, schedule)
  }

  getSchedule(id: string) {
    return this.http.get<Schedule>(`${url}/museum/${id}`)
  }
}
