import { UserService } from 'src/app/auth/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/auth/user/user';

@Component({
  selector: 'app-portal-page',
  templateUrl: './portal-page.component.html',
  styleUrls: ['./portal-page.component.scss']
})
export class PortalPageComponent implements OnInit {

  idUser!: number | undefined
  museumName?: string
  canLoad = false

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.returnUser()
  }

  returnUser(){
    this.userService.returnUser().subscribe({
      next: (res) => {
        this.idUser = res.id
        this.getUser()
      },
      error: (error) => console.log(error.error)
    }).unsubscribe()
  }

  getUser() {
    this.userService.getUser(this.idUser).subscribe({
        next: (res) => this.museumName = res.admin?.museumName,
        error: (error) => console.log(error.error),
        complete: () => this.canLoad = true
    })
  }
}
