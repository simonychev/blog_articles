import {Component, Input, OnInit} from '@angular/core';
import {CommentService} from "../../services/comment.service";
import {CommentDetailType} from "../../../../types/comment-detail.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DetailArticleType} from "../../../../types/detail-article.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {CommentActionType} from "../../../../types/comment-action.type";
import {CommentType} from "../../../../types/comment.type";

@Component({
  selector: 'comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {

  @Input() articleDetail: DetailArticleType = {
    text: "",
    comments: [],
    commentsCount: 0,
    id: '',
    title: '',
    description: '',
    image: '',
    date: '',
    category: '',
    url: ''
  };

  @Input() comments: CommentDetailType[] = [];

  @Input() comment: CommentDetailType = {
    id: '',
    text: '',
    date: '',
    likesCount: 0,
    dislikesCount: 0,
    user: {
      id: '',
      name: ''
    },
  };

  constructor(private commentService: CommentService,
              private _snackBar: MatSnackBar) {
  }
  ngOnInit() {
  }

  actionComment(id: string, action: string) {
    this.comments.forEach(commentItem => {
      if (commentItem.id === id) {
        const currentComment = commentItem;
        this.commentService.postApplyAction(id, action)
          .subscribe({
            next: (data: DefaultResponseType) => {
              if (data.error) {
                this._snackBar.open(data.message);
                throw new Error(data.message);
              }
              if (action === currentComment.action) {
                currentComment.action = '';
                this._snackBar.open('Ваш голос отменен');
                if (action === 'like') {
                  currentComment.likesCount--;
                }
                if (action === 'dislike') {
                  currentComment.dislikesCount--;
                }
              } else {
                if (action === 'violate') {
                  this._snackBar.open('Жалоба отправлена');
                } else {
                  this._snackBar.open('Ваш голос учтен');
                  if (action === 'like') {
                    if (currentComment.action === 'dislike') currentComment.dislikesCount--;
                    currentComment.likesCount++;
                  }
                  if (action === 'dislike') {
                    if (currentComment.action === 'like') currentComment.likesCount--;
                    currentComment.dislikesCount++;
                  }
                }
                currentComment.action = action;
              }
              this.getUserActions();
            },
            error: (errorResponse: HttpErrorResponse) => {
              if (errorResponse.error && errorResponse.error.message) {
                this._snackBar.open('Жалоба уже отправлена');
              } else {
                this._snackBar.open('Ошибка');
              }
            }
          });
      }
    });
  }

  getUserActions() {
    this.commentService.getArticleCommentAction(this.articleDetail.id)
      .subscribe((actions: CommentActionType[]) => {
        actions.forEach(action => {
          this.comments.forEach(comment => {
            if (comment.id === action.comment) {
              comment.action = action.action;
            }
          })
        })
      })
  }
}
