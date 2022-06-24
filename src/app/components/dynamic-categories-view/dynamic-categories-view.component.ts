import {Component, OnInit} from '@angular/core';
import {CategoryModel} from "../../../models/CategoryModel";
import {AppCategoriesService} from "../../services/app-categories.service";

@Component({
  selector: 'app-dynamic-categories-view',
  templateUrl: './dynamic-categories-view.component.html',
  styleUrls: ['./dynamic-categories-view.component.scss']
})
export class DynamicCategoriesViewComponent implements OnInit {

  categories: CategoryModel[];
  selectedCategories: string[];

  constructor(private categoriesService: AppCategoriesService) {
    this.categories = [];
    this.selectedCategories = [];
  }

  ngOnInit(): void {
    this.categories = this.categoriesService.getCategories;
    this.selectedCategories = this.categoriesService.getSelectedCategories;
  }

  onCategoryClick(category: string) {
    this.categoriesService.categoryClicked(category);
  }

}
