import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from "../../../models/Product.model";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  constructor() {
  }

  name = new FormControl('');

  @Input()
  product!: ProductModel;

  ngOnInit(): void {
    if (this.product === undefined) {
      this.product =
        {
          name: "empty",
          category: ["empty"],
          description: ["empty"],
          price: 0,
          picture: "empty",
          quantity: 0,
          features: ["empty"],
          tags: ["empty"],
          specs: [new Map]
        }
    }
  }
}
