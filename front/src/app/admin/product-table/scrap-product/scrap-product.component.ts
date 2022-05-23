import { Component, Inject } from '@angular/core';
import { ScrapedProductService } from 'src/app/services/scraped-product.service';
import { Product } from 'src/app/models/product';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-scrap-product',
  templateUrl: './scrap-product.component.html',
  styleUrls: ['./scrap-product.component.css'],
})
export class ScrapProductComponent {
  constructor(
    private scrapedProductService: ScrapedProductService,
    public dialogRef: MatDialogRef<ScrapProductComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmeScrap(): void {
    this.scrapedProductService.scrapProduct(this.product).subscribe();
  }
}
