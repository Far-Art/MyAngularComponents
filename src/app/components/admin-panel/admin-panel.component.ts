import {Component, OnInit} from '@angular/core';
import {Product} from "../../../models/Product.model";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  adminPanelTitle = 'Admin Panel';

  product: Product = {
    name: "PC",
    category: ["Hardware", "Computer", "Gaming"],
    description: ["Gaming pc for you"],
    price: 1500.99,
    picture: "some url",
    quantity: 10,
    features: ["fast", "liquid cooling", "rgb leds"],
    tags: ["fancy", "gaming", "rgb", "no headache"],
    specs: [new Map]
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
