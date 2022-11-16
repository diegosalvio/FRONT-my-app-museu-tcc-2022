import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Schedule } from 'src/app/interfaces/schedule';
import { ScheduleService } from 'src/app/services/schedule.service';
import { Museum } from 'src/app/interfaces/museum';

@Component({
  selector: 'app-new-schedule',
  templateUrl: './new-schedule.component.html',
  styleUrls: ['./new-schedule.component.scss']
})
export class NewScheduleComponent implements OnInit {

  @Input() museum: Museum | undefined

  scheduleForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private scheduleService: ScheduleService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log("id do museu: ", this.museum)
    this.scheduleForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ["", [Validators.required, Validators.minLength(3)]],
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
      image: ["", [Validators.required]]
    })
  }

  submitSchedule() {
    if (this.scheduleForm.valid) {
      const schedule: Schedule = {
        title: this.scheduleForm.get("title")?.value,
        description: this.scheduleForm.get("description")?.value,
        date: {
          startDate: this.scheduleForm.get("startDate")?.value,
          endDate: this.scheduleForm.get("endDate")?.value
        },
        image: this.scheduleForm.get("image")?.value
      }
      this.scheduleService.newSchedule(this.museum?._id, schedule).subscribe({
        next: (res) => console.log("A programação foi cadastrada: ", res),
        error: (error) => this.snackbar.open(error.error, "okay"),
        complete: () => this.snackbar.open("Programação cadastrada com sucesso", "okay")
      })
      return
    }
    this.snackbar.open("Formulário inválido", "okay")
  }

  get titleError() {
    return this.scheduleForm.get("title")?.errors
  }
  get descriptionError() {
    return this.scheduleForm.get("description")?.errors
  }
  get startDateError() {
    return this.scheduleForm.get("startDate")?.errors
  }
  get endDateError() {
    return this.scheduleForm.get("endDate")?.errors
  }
  get imageError() {
    return this.scheduleForm.get("image")?.errors
  }

  get formTouched() {
    return this.scheduleForm.touched
  }

}
