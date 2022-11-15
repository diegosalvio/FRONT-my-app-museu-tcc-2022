import { MuseumService } from './../../../services/museum.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Schedule } from 'src/app/interfaces/schedule';
import { Museum } from 'src/app/interfaces/museum';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-view-schedule',
  templateUrl: './view-schedule.component.html',
  styleUrls: ['./view-schedule.component.scss']
})
export class ViewScheduleComponent implements OnInit {

  schedules$!: Observable<Schedule[]>
  museums$!: Observable<Museum[]>

  viewSchedule!: Schedule

  viewScheduleForm!: FormGroup
  canLoad = false

  startDate: any
  endDate: any

  constructor(
    private scheduleService: ScheduleService,
    private museumService: MuseumService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.viewScheduleForm = this.fb.group({
      museum: [""],
      schedule: [""]
    })
    this.getMuseums()
  }

  getMuseums() {
    this.museums$ = this.museumService.getAllMuseums()
  }

  chooseMuseum() {
    this.schedules$ = this.scheduleService.getSchedulesByMuseum(this.viewScheduleForm.get("museum")?.value)
  }

  showSchedule() {
    console.log(this.viewScheduleForm.get("schedule")?.value)
    this.viewSchedule = this.viewScheduleForm.get("schedule")?.value
    this.startDate = this.formatDate(this.viewSchedule.date.startDate)
    this.endDate = this.formatDate(this.viewSchedule.date.endDate)
    this.canLoad = true
  }


  formatDate(date: any) {
    const currentDate = new Date(date)
    const day = currentDate.getUTCDate()
    const month = currentDate.getUTCMonth()
    const year = currentDate.getUTCFullYear()
    const newDate = day + "/" + month + "/" + year
    return newDate
  }

}
