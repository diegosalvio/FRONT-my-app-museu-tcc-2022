import { UserInfo } from './../../../auth/user/user';
import { Router } from '@angular/router';
import { DialogComponent } from './../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/auth/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap, Observable } from 'rxjs';
import { LoginService } from 'src/app/home/login/login.service';
import { User, EditedUser } from 'src/app/home/sign-up/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  editUserForm!: FormGroup
  user$!: Observable<UserInfo>
  user!: EditedUser
  idUser: number | undefined

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog,
    private route: Router
  ) { }

  ngOnInit() {
    console.log("usuário: ", this.user)
    this.editUserForm = this.formBuilder.group({
      name: [{value: "", disabled: true}, [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z_ ]*$')]],
      phone: [{value: "", disabled: true}, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]*$')]],
      email: [{value: "", disabled: true}, [Validators.email]]
    })
    this.getUser()
  }

  getUser() {
    try {
      try {
        this.userService.returnUser().subscribe(res => this.idUser = res.id)
        this.userService.getUser(this.idUser).subscribe((res) => {
          this.editUserForm.get("name")?.patchValue(res.name)
          this.editUserForm.get("phone")?.patchValue(res.phone)
          this.editUserForm.get("email")?.patchValue(res.email)
        })
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  editInput(control: string) {
    this.editUserForm.get(control)?.enable()
  }

  updateUser() {
    if (this.editUserForm.valid) {
      try {
        this.userService.updateUser(this.idUser, this.editUserForm.value).subscribe(
          (res) => {
            console.log("Resposta: ", res)
          }
        )
      } catch (error) {
        console.log(error)
      }
    }
  }

  deleteUser() {
    this.dialog.open(DialogComponent, {
      data: {
        title: "ATENÇÂO!",
        body: "VOCÊ DESEJA REALMENTE EXCLUIR O SEU USUÁRIO",
        action: "EXCLUIR"
      }
    }).afterClosed().subscribe((res) => {
      if (res === true) {
        try {
          this.userService.deleteUser(this.idUser).subscribe(
            res => {
              console.log(res)
            }
          )
          this.userService.logout()
          this.route.navigate([''])
        } catch (error) {
          console.log(error)
        }

      }
    })
  }
}
