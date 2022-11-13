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

  editScheduleForm!: FormGroup
  disables = false

  constructor(
    private fb: FormBuilder,
    private scheduleService: ScheduleService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.editScheduleForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ["", [Validators.required, Validators.minLength(3)]],
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
      image: ["", [Validators.required]]
    })
    this.patchForm()
    this.editScheduleForm.disable()
  }

  editInput(control: string) {
    this.editScheduleForm.get(control)?.enable()
    this.disables = true
  }

  editDate() {
    this.editScheduleForm.get("startDate")?.enable()
    this.editScheduleForm.get("endDate")?.enable()
  }

  patchForm() {
    this.editScheduleForm.patchValue({
      title: this.museum?.schedule?.title,
      description: this.museum?.schedule?.description,
      startDate: this.museum?.schedule?.date?.startDate,
      endDate: this.museum?.schedule?.date?.endDate,
      image: this.museum?.schedule?.image
    })
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
      this.scheduleService.toSchedule(this.museum?._id, updatedSchedule).subscribe({
        next: (res) => console.log("Programação atualizada: ", res),
        error: (error) => this.snackbar.open(error.error),
        complete: () => this.snackbar.open("Programação atualizada com sucesso", "okay")
      })
      return
    }
    this.snackbar.open("Formulário inválido. Tente novamente", "okay")
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
