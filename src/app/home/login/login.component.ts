import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Login } from '../sign-up/user';
import { LoginService } from './login.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hidePwd = true

  signinForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  login(): void {
    const logar = this.signinForm.getRawValue() as Login

    this.loginService.postLogin(logar).subscribe({
     complete: () => {
       console.log("Usuário Logado")
       this.router.navigate(['menu'])
     },
     error: (error) => {
      const errorMessage = error.error.message
      this.openSnackBar(errorMessage, "x")
     }
    })
  }
}
