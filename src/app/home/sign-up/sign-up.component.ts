import { User } from './user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewUserService } from './new-user.service';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  newUserForm!: FormGroup

  users!: Array<User>

  constructor(
    private formBuilder: FormBuilder,
    private newUserService: NewUserService
  ) {
  }

  ngOnInit(): void {
    this.newUserForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['',
        [Validators.required,
        Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    })
  }


  signUp() {
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
