import { User } from './user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewUserService } from './new-user.service';
import { Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  newUserForm!: FormGroup

  users!: Array<User>

  hidePwd = true

  constructor(
    private formBuilder: FormBuilder,
    private newUserService: NewUserService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.newUserForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z_ ]*$')]],
      birthDate: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]*$')]],
      email: ['',
        [Validators.required,
        Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }


  signUp() {

    if(this.newUserForm.get("password")?.value !== this.newUserForm.get("confirmPassword")?.value) {
      //snackBar
      this.newUserForm.get("password")?.setValue('')
      this.newUserForm.get("confirmPassword")?.setValue('')

      this.openSnackBar("As senhas estão diferentes", "X");

    }

    if (this.newUserForm.valid) {
      const newUser = this.newUserForm.getRawValue() as User

      this.newUserService.addNewUser(newUser).subscribe(
        {
          complete: () => {
            console.log("Usuário Cadastrado")
          },
          error: (error) => {
            console.log("ERROR ADD NEW USER: ", error)
          }
        }
      )
    }
  }
}
