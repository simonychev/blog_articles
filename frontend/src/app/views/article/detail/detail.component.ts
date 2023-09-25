import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {DetailArticleType} from "../../../../types/detail-article.type";
import {ArticleService} from "../../../shared/services/article.service";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {ArticleType} from "../../../../types/article.type";
import {AuthService} from "../../../core/auth/auth.service";
import {CommentService} from "../../../shared/services/comment.service";
import {CommentType} from "../../../../types/comment.type";
import {CommentDetailType} from "../../../../types/comment-detail.type";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailComponent implements OnInit {
  countComment: number = 3;
  @Input() article: ArticleType = {
    id: '',
    title: '',
    description: '',
    image: '',
    date: '',
    category: '',
    url: ''
  };
  @Input() comment: CommentDetailType = {
    id: '',
    text: '',
    date: '',
    likesCount: 0,
    dislikesCount: 0,
    user: {
      id: '',
      name: ''
    }
  };
  articleDetail!: DetailArticleType;
  articles: DetailArticleType[] = [];
  serverStaticPath = environment.serverStaticPath;
  isLogged: boolean = false;
  textComment: string = '';
  comments: CommentDetailType[] = [];
  constructor (private articleService: ArticleService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private commentService: CommentService,
              private _snackBar: MatSnackBar)
  {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  allCount: number = 0;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.articleService.getArticle(params['url'])
        .subscribe((dataUrl: DetailArticleType) => {
          this.articleDetail = dataUrl;
          this.articleService.getArticleRelated(this.articleDetail.url)
            .subscribe((article: DetailArticleType[]) => {
              this.articles = article;
              this.commentService.getComments(0, this.articleDetail.id)
                .subscribe((data: CommentType) => {
                  this.comments = data.comments;
                  this.allCount = data.allCount;
                });
            });
        });
    });
  }

  addComment() {
    this.commentService.addComments(this.textComment, this.articleDetail.id)
      .subscribe((data) => {
        this.commentService.getComments(0, this.articleDetail.id)
          .subscribe((data: CommentType) => {
            this.comments = data.comments;
            this.allCount = data.allCount;
            this.textComment = '';
          });
      })
  }

  getDownloadComment() {
    const offset: number = (this.allCount - this.countComment) > 10  ? 10 : this.allCount;
    this.commentService.getComments(offset, this.articleDetail.id)
      .subscribe((data: CommentType) => {
        this.comments.push(...data.comments);
        this.countComment += 10;
      });
  }
}
