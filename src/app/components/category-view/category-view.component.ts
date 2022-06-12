import {Component, Input, OnInit} from '@angular/core';
import {CategoryModel} from "../../../models/CategoryModel";

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.scss']
})
export class CategoryViewComponent implements OnInit {

  @Input() selectedCategory: CategoryModel;

  constructor() {
    this.selectedCategory = {
      main: "",
      secondary: []
    }
  }

  ngOnInit(): void {
  }

}
