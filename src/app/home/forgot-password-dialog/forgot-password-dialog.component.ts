import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/auth/user/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.scss']
})
export class ForgotPasswordDialogComponent implements OnInit {

  forgotPwdForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.forgotPwdForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    })
  }


  sendEmail() {
    let email = this.forgotPwdForm.get("email")?.value
    this.userService.sendEmail(email).subscribe({
      next: (res) => {
        const message = "Um e-mail de recuperação de senha foi enviado para o seguinte endereço: " + email
        this.snackbar.open(message.concat("..."), "okay")
      },
      error: (error) => this.snackbar.open(error.message, "okay"),
      complete: () => this.snackbar.open("Confira sua caixa de entrada!", "okay")
    })
  }

  get errorEmail() {
    return this.forgotPwdForm.get("email")?.errors
  }

}
