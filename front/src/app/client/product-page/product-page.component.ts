import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ScrapedProduct } from 'src/app/models/scraped-product';
import { ScrapedProductService } from '../../services/scraped-product.service';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  productData!: Product;
  scrapedProducts!: ScrapedProduct[];
  displayedColumns: string[] = [
    'imgUrl',
    'name',
    'shop',
    'price',
    'date',
    'actions',
  ];

  constructor(
    private productService: ProductService,
    private scrapedProductService: ScrapedProductService,
    private productRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    let productId = this.productRoute.snapshot.params['id'];
    this.productService.getProductById(productId).subscribe(
      (data: Product) => {
        this.productData = data;
      },
      (err: any) => console.log(err)
    );

    this.scrapedProductService.getScrapedProductsById(productId).subscribe(
      (data: ScrapedProduct[]) => {
        //console.log(data);
        this.scrapedProducts = data;
      },
      (err: any) => console.log(err)
    );
  }
}
