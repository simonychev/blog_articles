import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {CategoryType} from "../../../../types/category.type";
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute, Event, Router} from "@angular/router";
import {ActiveParamsType} from "../../../../types/active-params.type";

@Component({
  selector: 'category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit {

  constructor(private categoryService: CategoryService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private el: ElementRef) { }

  categories: CategoryType[] = [];
  activeParams: ActiveParamsType = {categories: []};
  open: boolean = false;

  @HostListener('document:click', ['$event'])
  onCloseFiltered(event: MouseEvent): void {
     if (!this.el.nativeElement.contains(event.target) && this.open) {
      this.toogle()
     }
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.hasOwnProperty('categories')) {
        this.activeParams.categories = Array.isArray(params['categories']) ? params['categories'] : [params['categories']];
      }
    })

    this.categoryService.getCategories()
      .subscribe((data: CategoryType[]) => {
        this.categories = data;
      })
  }

  toogle(): void {
    this.open = !this.open;
  }

  updateFilterParam(url: string) {
    if (this.activeParams.categories && this.activeParams.categories.length > 0) {
      const existingCategoryParams = this.activeParams.categories.find(item => item === url);
      if (existingCategoryParams) {
        this.activeParams.categories = this.activeParams.categories.filter(item => item !== url);
      } else if (!existingCategoryParams) {
        this.activeParams.categories = [...this.activeParams.categories, url];

      }
    } else {
      this.activeParams.categories = [url];
    }

    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    });
  }

}
