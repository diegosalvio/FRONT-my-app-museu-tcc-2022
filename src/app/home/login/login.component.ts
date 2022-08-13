import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Login } from '../sign-up/user';
import { LoginService } from './login.service';

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  login(): void {
    const logar = this.signinForm.getRawValue() as Login

    this.loginService.postLogin(logar).subscribe({
     complete: () => {
       console.log("Usuário Logado")
       this.router.navigate(['menu'])
     },
     error: () => {
      console.log("ERRO ao lugar, verifique novamente as informações inseridas")
     }
    })
  }
}
