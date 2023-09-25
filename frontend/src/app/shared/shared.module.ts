import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArticleCardComponent} from "./components/article-card/article-card.component";
import {RouterModule} from "@angular/router";
import { DescriptionArticlePipe } from './pipes/description-article.pipe';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { CommentCardComponent } from './components/comment-card/comment-card.component';
import { DescriptionArticleTitlePipe } from './pipes/description-article-title.pipe';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ArticleCardComponent,
    DescriptionArticlePipe,
    CategoryFilterComponent,
    CommentCardComponent,
    DescriptionArticleTitlePipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
    exports: [
        ArticleCardComponent,
        DescriptionArticlePipe,
        CategoryFilterComponent,
        CommentCardComponent,
    ],
})
export class SharedModule { }
