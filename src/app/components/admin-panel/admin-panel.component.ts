import {Component, OnInit} from '@angular/core';
import {ProductModel} from "../../../models/Product.model";
import {AppCategories} from "../../../shared/AppCategories";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  adminPanelTitle = 'Admin Panel';

  categories: Map<string, string[]> = new AppCategories().categories;

  product: ProductModel = {
    name: "PC",
    category: ["Hardware", "Computer", "Gaming"],
    description: ["Gaming pc for you"],
    price: 1500.99,
    picture: "some url",
    quantity: 10,
    features: ["fast", "liquid cooling", "rgb leds"],
    tags: ["fancy", "gaming", "rgb", "no headache"],
    specs: [new Map(
      [["CPU", "intel core i9"],
        ["GPU", "Nvidia RTX 3090"],
        ["RAM", "64 GB"]])]
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
