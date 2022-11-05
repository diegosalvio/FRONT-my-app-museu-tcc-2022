import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  newComment(idperson: string, newComment: Comment){
    return this.httpClient.post(`${url}/person/add-comment/${idperson}`, newComment)
  }
}
