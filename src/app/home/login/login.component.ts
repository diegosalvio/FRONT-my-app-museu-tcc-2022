import { ForgotPasswordDialogComponent } from './../forgot-password-dialog/forgot-password-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Login } from '../sign-up/user';
import { LoginService } from './login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hidePwd = true

  signinForm!: FormGroup

  isLoading = false

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
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

  openForgotPasswordDialog() {
    this.dialog.open(ForgotPasswordDialogComponent)
  }

  login(): void {
    const logar = this.signinForm.getRawValue() as Login

    this.isLoading = true
    this.loginService.postLogin(logar).subscribe({
      next: (res) => {
        console.log("Esse usuário se logou: ", res)
      },
      complete: () => {
        console.log("Usuário Logado")
        this.router.navigate(['menu'])
      },
      error: (error) => {
        this.isLoading = false
        const errorMessage = error.error.message
        this.openSnackBar(errorMessage, "x")
      }
    })
  }
}
