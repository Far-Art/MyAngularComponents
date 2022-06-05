import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dynamic-categories-view',
  templateUrl: './dynamic-categories-view.component.html',
  styleUrls: ['./dynamic-categories-view.component.scss']
})
export class DynamicCategoriesViewComponent implements OnInit {

  @Input() categories: Map<string, string[]>;

  constructor() {
    this.categories = new Map();
  }

  ngOnInit(): void {
  }

}
