import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {CommentType} from "../../../types/comment.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {UserActonType} from "../../../types/user-acton.type";
import {CommentActionType} from "../../../types/comment-action.type";
import {CommentDetailType} from "../../../types/comment-detail.type";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getComments(offset: number, article: string): Observable<CommentType> {
    return this.http.get<CommentType>(environment.api + 'comments?offset=' + offset + '&article=' + article)
  }

  addComments(text: string, article: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments', {text, article})
  }

  postApplyAction(id: string, action: string): Observable<DefaultResponseType>{
    return this.http.post<DefaultResponseType>(environment.api + 'comments/'+ id +'/apply-action', {action})
  }
  getActionsForComment(id: string): Observable<DefaultResponseType | UserActonType[]>{
    return this.http.get<DefaultResponseType | UserActonType[]>(environment.api + 'comments/'+ id +'/actions')
  }
  getArticleCommentAction(id: string): Observable<CommentActionType[]>{
    return this.http.get<CommentActionType[]>(environment.api + 'comments/article-comment-actions?articleId=' + id)
  }
}
