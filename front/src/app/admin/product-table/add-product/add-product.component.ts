import { Component, Inject } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  constructor(private productService: ProductService, @Inject(MAT_DIALOG_DATA) public product: Product, public dialogRef: MatDialogRef<AddProductComponent>) { }

  formControl = new FormControl('', [
    Validators.required
  ]);
  
  getErrorMessage() {
    return true;
  }

  submit() {
    console.log("submited");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    console.log(this.product);
    this.productService.addProduct(this.product).subscribe();
  }
}
