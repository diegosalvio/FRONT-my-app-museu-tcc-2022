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
  ratingArr: boolean [] = [];
  commentForm!:FormGroup


  constructor(
    private dialog: MatDialog,
    private router: Router,
    private formBuider: FormBuilder
    ) {
      this.ratingArr = Array(this.starCount).fill(false)
    }

    ngOnInit(): void {
      this.commentForm = this.formBuider.group({
        comment: ['']
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
      //console.log("colocando a estrela", i)
    }

    addComments(){
      this.dialog.open(DialogComponent, {
        data: {
          title: "Obrigada :)",
          body: "Comentário adicionado com sucesso!",
          action: "Ok"
        }
      }).afterClosed().subscribe(res => {
        if(res){
          if(this.commentForm.valid){
            const review: Comment = {
              commentary: this.commentForm.get('comment')?.value,
              rating: this.rating,
            }
            console.log(review)
          }
          this.router.navigate(["menu"])
        }
      })
    }

    openDialogLater(): void{
      this.dialog.open(DialogComponent, {
        data: {
          title: "Atenção!",
          body: "Tem certeza que deseja registrar a experiência mais tarde?",
          action: "Sim"
        }
      })
    }


    openDialogCancel(){
      this.dialog.open(DialogComponent, {
        data: {
          title: "Atenção!",
          body: "Tem certeza que não quer registrar sua experiência?",
          action: "Sim"
        }
      }).afterClosed().subscribe(res => {
        if(res) {
          this.router.navigate(["menu"])
        }
      })
    }

}
