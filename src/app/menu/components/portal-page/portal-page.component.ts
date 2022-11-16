import { DialogComponent } from './../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AddCommentService } from 'src/app/services/add-comment.service';
import { UserService } from 'src/app/auth/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/auth/user/user';
import { Comment } from 'src/app/interfaces/comment';
import { EditCommentDialogComponent } from '../view-comments/edit-comment-dialog/edit-comment-dialog.component';

@Component({
  selector: 'app-portal-page',
  templateUrl: './portal-page.component.html',
  styleUrls: ['./portal-page.component.scss']
})
export class PortalPageComponent implements OnInit {

  idUser!: number | undefined
  museumName?: string
  canLoad = false
  laterComments!: Comment[]
  showBadge = false

  constructor(
    private userService: UserService,
    private commentsService: AddCommentService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.returnUser()
    this.getComments()
  }

  returnUser() {
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

  getComments() {
    this.commentsService.getComments(this.idUser).subscribe({
      next: (res) => {
        this.laterComments = res.filter((res) => res.later)
        console.log()
        if (this.laterComments.length) {
          this.showBadge = true
        }
      }
    })
  }

  laterComment() {
    if (this.laterComments.length) {
      this.dialog.open(DialogComponent, {
        data: {
          title: "Registrar experiência",
          body: "Deseja escrever sobre a visita agora?",
          action: "Sim!"
        }
      }).afterClosed().subscribe((res) => {
        if (res) {
          this.editDialog()
        }
      })
    }
  }

  editDialog() {
    this.dialog.open(EditCommentDialogComponent, {
      data: {
        id: this.laterComments[0]._id,
        later: true
      }
    }).afterClosed().subscribe(() => window.location.reload())
  }

}
