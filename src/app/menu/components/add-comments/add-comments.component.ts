import { MatSnackBar } from '@angular/material/snack-bar';
import { UserInfo } from './../../../auth/user/user';
import { UserService } from 'src/app/auth/user/user.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Comment } from 'src/app/interfaces/comment';
import { AddCommentService } from 'src/app/services/add-comment.service';

@Component({
  selector: 'app-add-comments',
  templateUrl: './add-comments.component.html',
  styleUrls: ['./add-comments.component.scss']
})
export class AddCommentsComponent implements OnInit {
  rating = 0;
  starCount = 5;
  ratingArr: boolean[] = [];
  commentForm!: FormGroup
  user!: UserInfo
  idUser: number | undefined


  constructor(
    private dialog: MatDialog,
    private router: Router,
    private formBuider: FormBuilder,
    private commentService: AddCommentService,
    private userService: UserService,
    private snackbar: MatSnackBar
  ) {
    this.ratingArr = Array(this.starCount).fill(false)
  }

  ngOnInit(): void {
    this.getCurrentUser()
    this.commentForm = this.formBuider.group({
      comment: ['']
    })
  }

  returStar(i: number) {
    if (this.rating >= i + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
  onClick(i: number) {
    this.rating = i + 1;
  }

  addComments() {
    this.dialog.open(DialogComponent, {
      data: {
        title: "Obrigada :)",
        body: "Comentário adicionado com sucesso!",
        action: "Ok"
      }
    }).afterClosed().subscribe(res => {
      if (res) {
        if (this.commentForm.valid) {
          const review: Comment = {
            commentary: this.commentForm.get('comment')?.value,
            rating: this.rating,
          }
          this.commentService.newComment(this.user._id, review).subscribe({
            next: (res) => console.log("o seguinte comentário foi adicionado: ", res),
            error: (error) => console.log(error),
            complete: () => this.snackbar.open("Comentário adicionado com sucesso!", "okay")
          })
        }
        this.router.navigate(["menu"])
      }
    })
  }

  openDialogLater(): void {
    this.dialog.open(DialogComponent, {
      data: {
        title: "Atenção!",
        body: "Tem certeza que deseja registrar a experiência mais tarde?",
        action: "Sim"
      }
    }).afterClosed().subscribe((res) => {
      if (res) {
        const review: Comment = {
          later: true,
          commentary: "Faça o seu comentário!!!!!",
          rating: 1,
        }
        this.commentService.newComment(this.user._id, review).subscribe({
          next: (res) => console.log("o seguinte comentário foi adicionado: ", res),
          error: (error) => console.log(error),
          complete: () => this.snackbar.open("Não se esqueça de registrar sua experiência!", "okay")
        })
        this.router.navigate(["menu"])
      }
    })
  }

  openDialogCancel() {
    this.dialog.open(DialogComponent, {
      data: {
        title: "Atenção!",
        body: "Tem certeza que não quer registrar sua experiência?",
        action: "Sim"
      }
    }).afterClosed().subscribe(res => {
      if (res) {
        this.router.navigate(["menu"])
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
