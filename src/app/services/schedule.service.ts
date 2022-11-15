import { Observable, tap } from 'rxjs';
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

  newSchedule(idMuseum: string | undefined, schedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(`${url}/museum/new-schedule/${idMuseum}`, schedule)
  }

  updateSchedule(id: string | undefined, updatedSchedule: Schedule): Observable<Schedule> {
    return this.http.patch<Schedule>(`${url}/museum/update-schedule/${id}`, updatedSchedule)
  }

  getOneSchedule(id: string | undefined): Observable<Schedule> {
    return this.http.get<Schedule>(`${url}/museum/schedule/${id}`)
  }

  getSchedulesByMuseum(id: string | undefined): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${url}/museum/schedules/${id}`)
  }

  deleteSchedule(id: string | undefined): Observable<Schedule> {
    return this.http.delete<Schedule>(`${url}/museum/delete-schedule/${id}`)
  }







  toSchedule(id: string | undefined, schedule: Schedule) {
    return this.http.patch<Schedule>(`${url}/museum/patch-schedule/${id}`, schedule)
  }

  getSchedule(id: string) {
    return this.http.get<Schedule>(`${url}/museum/${id}`)
  }
}
