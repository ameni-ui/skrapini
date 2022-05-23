import { Component, Inject } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent  {

  constructor(private productService: ProductService, @Inject(MAT_DIALOG_DATA) public product: Product, public dialogRef: MatDialogRef<UpdateProductComponent>) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);
  
  getErrorMessage() {
    return true;
  }

  submit() {
    // empty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmUpdate(): void {
    console.log(this.product);
    console.log(this.product);
    this.productService.updateProduct(this.product).subscribe();
  }

}
