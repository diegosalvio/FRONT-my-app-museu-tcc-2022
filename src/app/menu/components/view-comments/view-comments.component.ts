import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AddCommentService } from 'src/app/services/add-comment.service';
import { Comment } from 'src/app/interfaces/comment';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { defaultRippleAnimationConfig } from '@angular/material/core';

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

  constructor(
    private commentsService: AddCommentService
  ) {
    this.ratingArr = Array(this.starCount).fill(false)
  }


  ngOnInit(): void {
    this.getComments()
    this.returStar()
  }
  getComments(){
    this.comments$ = this.commentsService.getComments("62db010d11c6ee8087104b74")
  }
  /* returStar(i: number){
    if(this.rating >= i +1){
      return 'star';
    }else{
      return 'star_border';
    }
  } */
  returStar(){
    this.commentsService.getComments("62db010d11c6ee8087104b74").subscribe(
      (res) => {
        this.rating = res[0].rating
        let i!: number
        for(i = 0; i>= this.rating; i++){
          return "star"
        }
        return
      }
    )
  }

}
