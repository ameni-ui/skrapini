import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() productData!: Product;

  constructor(private router: Router) {}

  ngOnInit(): void {}
  onClick(productId: number): void {
    this.router.navigateByUrl('product/' + productId);
  }
}
