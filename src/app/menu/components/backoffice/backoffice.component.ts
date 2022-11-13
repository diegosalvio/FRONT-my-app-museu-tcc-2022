import { MuseumService } from 'src/app/services/museum.service';
import { UserService } from 'src/app/auth/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/auth/user/user';
import { Museum } from 'src/app/interfaces/museum';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})
export class BackofficeComponent implements OnInit {

  idUser!: number | undefined
  admin!: Admin | undefined
  museumName?: string
  museum: Museum | undefined
  canLoad = false
  constructor(
    private userService: UserService,
    private museumService: MuseumService
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
        complete: () => this.getMuseum()
    })
  }

  getMuseum() {
    this.museumService.getOneMuseumByName(this.museumName).subscribe({
      next: (res) => this.museum = res,
      error: (error) => console.log(error),
      complete: () => this.canLoad = true
    })
  }
}
