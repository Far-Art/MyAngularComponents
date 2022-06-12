              import {Component, OnInit} from '@angular/core';
import {CategoryModel} from "../../../models/CategoryModel";
import {AppCategoriesService} from "../../services/app-categories.service";

@Component({
  selector: 'app-dynamic-categories-view',
  templateUrl: './dynamic-categories-view.component.html',
  styleUrls: ['./dynamic-categories-view.component.scss']
})
export class DynamicCategoriesViewComponent implements OnInit {

  categories!: CategoryModel[];

  constructor(private categoriesService: AppCategoriesService) {
    this.categories = categoriesService.getCategories();
  }

  ngOnInit(): void {
  }

}
