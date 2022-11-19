import { UserInfo } from './../../../auth/user/user';
import { UserService } from 'src/app/auth/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from './../dialog/dialog.component';
import { EditCommentDialogComponent } from './edit-comment-dialog/edit-comment-dialog.component';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AddCommentService } from 'src/app/services/add-comment.service';
import { Comment } from 'src/app/interfaces/comment';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-comments',
  templateUrl: './view-comments.component.html',
  styleUrls: ['./view-comments.component.scss']
})
export class ViewCommentsComponent implements OnInit {
  comments$!: Observable<Comment[]>;
  rating = 0;
  starCount = 5;
  ratingArr: boolean [] = [];
  user!: UserInfo
  idUser: number | undefined

  constructor(
    private commentsService: AddCommentService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private userService: UserService
  ) {
    this.ratingArr = Array(this.starCount).fill(false)
  }

  ngOnInit(): void {
    this.getCurrentUser()
    this.getComments()
  }
  getComments(){
    this.comments$ = this.commentsService.getComments(this.idUser)
  }

  editComment(id: string | undefined) {
    this.dialog.open(EditCommentDialogComponent, {
      data: {
        id: id
      }
    })
  }

  deleteComment(id: string | undefined) {
    this.dialog.open(DialogComponent, {
      data: {
        title: "Atenção!",
        body: "Deseja mesmo apagar o comentário?",
        action: "Apagar"
      }
    }).afterClosed().subscribe((res) => {
      if(res) {
        this.commentsService.deleteComment(id).subscribe({
          next: (res) => console.log("O comentário foi deletado: ",res),
          error: (error) => this.snackbar.open(error.error, "okay"),
          complete: () => {
            this.snackbar.open("Comentário excluído com sucesso", "okay")
            window.location.reload()
          }
        })
      }
    })
  }

  getCurrentUser() {
    this.userService.returnUser().subscribe(res => this.idUser = res.id)
    this.userService.getUser(this.idUser).subscribe((resp) => {
      this.user = resp
    })
  }
}
