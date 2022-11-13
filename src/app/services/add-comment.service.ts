import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../interfaces/comment';


const url = environment.URL_BASE

@Injectable({
  providedIn: 'root'
})
export class AddCommentService {
  constructor(
    private httpClient: HttpClient
  ) { }

  newComment(idperson: string | undefined, newComment: Comment){
    return this.httpClient.post(`${url}/person/add-comment/${idperson}`, newComment)
  }
  getComments(id:number | undefined): Observable<Comment[]>{
    return this.httpClient.get<Comment[]>(`${url}/person/get-comments/${id}`)
  }
  getComment(id:string): Observable<Comment>{
    return this.httpClient.get<Comment>(`${url}/person/get-comment/${id}`)
  }
  updateComment(id: string, comment: Comment) {
    return this.httpClient.patch<Comment>(`${url}/person/update-comment/${id}`, comment)
  }
  deleteComment(id:string | undefined): Observable<Comment>{
    return this.httpClient.delete<Comment>(`${url}/person/delete-comment/${id}`)
  }
}
