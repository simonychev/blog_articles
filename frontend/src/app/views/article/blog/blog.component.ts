import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ArticleType} from "../../../../types/article.type";
import {ActiveParamsType} from "../../../../types/active-params.type";
import {ActivatedRoute, Router} from "@angular/router";
import {AppliedFilterType} from "../../../../types/applied-filter.type";
import {CategoryType} from "../../../../types/category.type";
import {CategoryService} from "../../../shared/services/category.service";


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  articles: ArticleType[] = [];
  pages: number[] = [];
  activeParams: ActiveParamsType = {categories: []};
  appliedFilters: AppliedFilterType[] = [];

  activeStatus: boolean = false;

  constructor(private articleService: ArticleService, private activatedRoute: ActivatedRoute, private router: Router, private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories()
      .subscribe((data: CategoryType[]) => {
        this.activatedRoute.queryParams.subscribe(params => {
          if (params.hasOwnProperty('categories')) {
            this.activeParams.categories = Array.isArray(params['categories']) ? params['categories'] : [params['categories']];
            this.appliedFilters = [];
            this.activeParams.categories.forEach(url => {
              for (let i = 0; i < data.length; i++) {
                const foundCategory = data[i].url === url;
                if (foundCategory) {
                  this.appliedFilters.push({
                    name: data[i].name,
                    urlParam: url,
                  })
                  this.activeStatus = true;
                }
              }
            })
          }
          this.activeStatus = true;
          params.hasOwnProperty('page') ?
            this.activeParams.page = +params['page'] :
            this.activeParams.page = 1;
          if (params.hasOwnProperty('categories')) {}
          this.activeStatus = true;
          params.hasOwnProperty('page') ?
            this.activeParams.page = +params['page'] :
            this.activeParams.page = 1;
          this.articleService.getArticles(this.activeParams)
            .subscribe((data: { count: number, pages: number, items: ArticleType[] }) => {
              this.pages = [];
              for (let i = 1; i <= data.pages; i++) {
                this.pages.push(i);
              }
              this.articles = data.items;
            });
        });
      })
  }


  removeAppliedFilter(appliedFilter: AppliedFilterType) {
    this.activeParams.categories = this.activeParams.categories.filter(item => item !== appliedFilter.urlParam);
    this.activeParams.page = 1;
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    });
  }

  openPage(page: number) {
    this.activeParams.page = page;
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    });
  }

  openPrevPage() {
    if (this.activeParams.page && this.activeParams.page > 1) {
      this.activeParams.page--;
      this.router.navigate(['/blog'], {
        queryParams: this.activeParams
      });
    }
  }

  openNextPage() {
    if (this.activeParams.page && this.activeParams.page < this.pages.length) {
      this.activeParams.page++;
      this.router.navigate(['/blog'], {
        queryParams: this.activeParams
      });
    }
  }

}
