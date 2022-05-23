import { Component, Inject } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent {

  constructor(private productService: ProductService, @Inject(MAT_DIALOG_DATA) public product: Product, public dialogRef: MatDialogRef<DeleteProductComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmDelete(): void {
    console.log(this.product);
    this.productService.deleteProduct(this.product.id).subscribe();
  }

}
