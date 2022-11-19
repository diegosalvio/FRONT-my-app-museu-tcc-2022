import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../../auth/user/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  recoverPwdForm!: FormGroup
  id: number | undefined
  errorMessage!: string
  canLoad = false

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.recoverPwdForm = this.fb.group({
      password: [null, [Validators.pattern(/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]],
      confirmPassword: [null, [Validators.required]]
    })
    this.getId()
  }

  getId() {
    this.route.params.subscribe({
      next: (res: any) => this.id = res.id,
      error: (error) => {
        this.errorMessage = error.message
        console.log(this.errorMessage = error.message)
      },
      complete: () => this.canLoad = true
    })
  }

  handleRecoverPassword() {
    if (this.recoverPwdForm.valid) {
      const newPassword = this.recoverPwdForm.get("password")?.value
      console.log(newPassword)
      this.userService.recoverPassword(this.id, newPassword).subscribe({
        next: (res) => console.log(res),
        error: (error) => {
          this.errorMessage = error.message
          this.snackbar.open(this.errorMessage, "okay")
        },
        complete: () => {
          this.snackbar.open("Senha alterada com sucesso", "okay")
          this.router.navigate(["/"])
        }
      })
    }
  }


  get differentPwd() {
    return this.recoverPwdForm.get("password")?.value === this.recoverPwdForm.get("confirmPassword")?.value && this.recoverPwdForm.touched
  }

  get errorPwd() {
    return this.recoverPwdForm.get("password")?.errors
  }

}
