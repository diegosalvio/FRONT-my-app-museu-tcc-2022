import { DialogComponent } from './../../../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ScheduleService } from 'src/app/services/schedule.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Museum } from 'src/app/interfaces/museum';
import { Schedule } from 'src/app/interfaces/schedule';

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.scss']
})
export class EditScheduleComponent implements OnInit {

  @Input() museum: Museum | undefined

  schedules$!: Observable<Schedule[]>

  editScheduleForm!: FormGroup

  selectForm!: FormGroup
  disables = false
  canDisable = false

  constructor(
    private fb: FormBuilder,
    private scheduleService: ScheduleService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.editScheduleForm = this.fb.group({
      id: [""],
      title: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ["", [Validators.required, Validators.minLength(3)]],
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
      image: ["", [Validators.required]]
    })
    this.getSchedules()
    this.setEnablesDisables()
  }

  editInput(control: string) {
    this.editScheduleForm.get(control)?.enable()
    this.disables = true
  }

  editDate() {
    this.editScheduleForm.get("startDate")?.enable()
    this.editScheduleForm.get("endDate")?.enable()
  }

  getSchedules() {
    this.schedules$ = this.scheduleService.getSchedulesByMuseum(this.museum?._id)
  }

  getOneSchedule() {
    this.scheduleService.getOneSchedule(this.editScheduleForm.get("id")?.value).subscribe({
      next: (res) => {
        console.log(res)
        this.editScheduleForm.patchValue({
          title: res.title,
          description: res.description,
          startDate: res.date.startDate,
          endDate: res.date.endDate,
          image: res.image
        })
      },
      error: (error) => console.log(error),
      complete: () => this.canDisable = true
    })
  }

  setEnablesDisables() {
    this.editScheduleForm.disable()
    this.editScheduleForm.get("id")?.enable()
  }

  editSchedule() {
    if(this.editScheduleForm.valid) {
      const updatedSchedule: Schedule = {
        title: this.editScheduleForm.get("title")?.value,
        description: this.editScheduleForm.get("description")?.value,
        date: {
          startDate: this.editScheduleForm.get("startDate")?.value,
          endDate: this.editScheduleForm.get("endDate")?.value
        },
        image: this.editScheduleForm.get("image")?.value
      }
      this.scheduleService.updateSchedule(this.museum?._id, updatedSchedule).subscribe({
        next: (res) => console.log("Programação atualizada: ", res),
        error: (error) => this.snackbar.open(error.error),
        complete: () => this.snackbar.open("Programação atualizada com sucesso", "okay")
      })
      return
    }
    this.snackbar.open("Formulário inválido. Tente novamente", "okay")
  }

  deleteSchedule() {
    this.dialog.open(DialogComponent, {
      data: {
        title: "ATENÇÃO",
        body: "Tem certeza que deseja deletar a programação selecionada?",
        action: "deletar"
      }
    }).afterClosed().subscribe(
      (res) => {
        if(res) {
          this.scheduleService.deleteSchedule(this.editScheduleForm.get("id")?.value).subscribe({
            next: (res) => console.log("Será deletado: ", res),
            error: (error) => this.snackbar.open(error.error, "okay"),
            complete: () => {
              this.snackbar.open("Programação deletada com sucesso!", "okay")
              window.location.reload()
            }
          })
        }
      }
    )
  }


  get titleError() {
    return this.editScheduleForm.get("title")?.errors
  }
  get descriptionError() {
    return this.editScheduleForm.get("description")?.errors
  }
  get startDateError() {
    return this.editScheduleForm.get("startDate")?.errors
  }
  get endDateError() {
    return this.editScheduleForm.get("endDate")?.errors
  }
  get imageError() {
    return this.editScheduleForm.get("image")?.errors
  }

  get formTouched() {
    return this.editScheduleForm.touched
  }
}
