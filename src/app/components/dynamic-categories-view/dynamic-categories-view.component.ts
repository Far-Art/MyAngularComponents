import {Component, Input, OnInit} from '@angular/core';
import {CategoryModel} from "../../../models/CategoryModel";

@Component({
  selector: 'app-dynamic-categories-view',
  templateUrl: './dynamic-categories-view.component.html',
  styleUrls: ['./dynamic-categories-view.component.scss']
})
export class DynamicCategoriesViewComponent implements OnInit {

  @Input() categories: CategoryModel[];

  constructor() {
    this.categories = [];
  }

  ngOnInit(): void {
  }

}
