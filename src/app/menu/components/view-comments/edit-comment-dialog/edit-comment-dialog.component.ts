import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddCommentService } from 'src/app/services/add-comment.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Comment } from 'src/app/interfaces/comment';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-comment-dialog',
  templateUrl: './edit-comment-dialog.component.html',
  styleUrls: ['./edit-comment-dialog.component.scss']
})
export class EditCommentDialogComponent implements OnInit {

  rating = 0;
  starCount = 5;
  ratingArr: boolean [] = [];

  editCommentForm!: FormGroup
  comment!: Comment
  userRating!: number
  canLoad = false

  constructor(
    private AddCommentService: AddCommentService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: MatSnackBar
  ) {
    this.ratingArr = Array(this.starCount).fill(false)
  }

  ngOnInit(): void {
    this.getComment()
    this.editCommentForm = this.fb.group({
      comment: ['']
    })
    this.editCommentForm.disable()
  }

  getComment() {
    this.AddCommentService.getComment(this.data.id).subscribe({
      next: (res) => {
        this.editCommentForm.patchValue({
          comment: res.commentary
        })
        this.rating = res.rating
      },
      error: (error) => console.log(error),
      complete: () => this.canLoad = true
    })
  }

  returStar(i: number){
    if(this.rating >= i +1){
      return 'star';
    }else{
      return 'star_border';
    }
  }
  onClick(i:number){
    this.rating = i+1;
  }

  editInput() {
    this.editCommentForm.get("comment")?.enable()
  }

  submitEditedComment() {
    const comment: Comment = {
      commentary : this.editCommentForm.get("comment")?.value,
      rating: this.rating
    }
    this.AddCommentService.updateComment(this.data.id, comment).subscribe({
      next: (res) => console.log("O comentário foi editado: ", res),
      error: (error) => this.snackbar.open(error.error, "okay"),
      complete: () => this.snackbar.open("Seu comentário foi editado", "okay")
    })
  }
}
