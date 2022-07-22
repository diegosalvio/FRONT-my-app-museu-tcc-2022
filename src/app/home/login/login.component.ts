import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../sign-up/user';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true

  signinForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
   this.signinForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
   })
  }

  login() {
    const logar = this.signinForm.getRawValue() as Login
    this.loginService.postLogin(logar).subscribe({
     complete: () => {
       console.log("Usuário Logado")
     },
     error: () => {
      console.log("ERRO")
     }
    })
  }
}
