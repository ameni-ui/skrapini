
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../models/product';
import {Component, ViewChild, OnInit} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {AddProductComponent} from './add-product/add-product.component'
import {UpdateProductComponent} from './update-product/update-product.component'
import {DeleteProductComponent} from './delete-product/delete-product.component'
import {ScrapProductComponent} from './scrap-product/scrap-product.component'


@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit{
  displayedColumns: string[] = ['id', 'img', 'name', 'desc', 'category', 'price', 'actions'];
  dataSource: Product[] = [];
  id!: number;

  constructor(private productService: ProductService, public dialog: MatDialog) { }

  @ViewChild(MatTable) table!: MatTable<Product>;

  ngOnInit() {
    this.productService.getProducts().subscribe((data: Product[]) => {
     this.dataSource= data;
     console.log("in jhbj");
     },
     (err: any) => console.log(err),
   );
   console.log("waiting for response");

   }

   addProduct() {
    const dialogRef = this.dialog.open(AddProductComponent, {
      data: {product: Product }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.productService.getProducts().subscribe((data: Product[]) => {
          this.dataSource= data; },
          (err: any) => console.log(err),
        );
      }
    });
    this.table.renderRows();
  }

  deleteProduct(id: number) {
    this.id = id;
    const dialogRef = this.dialog.open(DeleteProductComponent, {
      data: {id: id}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.productService.getProducts().subscribe((data: Product[]) => {
          this.dataSource= data; },
          (err: any) => console.log(err),
        );
      }
    });
    this.table.renderRows();
  }

  updateProduct(id: number, name: string, category: string, price:number, desc: string, imgUrl: string) {
    this.id = id;
    const dialogRef = this.dialog.open(UpdateProductComponent, {
      data: {id: id, name: name, category: category, price: price, desc: desc, imgUrl: imgUrl}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.productService.getProducts().subscribe((data: Product[]) => {
          this.dataSource= data; },
          (err: any) => console.log(err),
        );
      }
    });
    this.table.renderRows();
  }

  scrapProduct(id: number, name: string) {
    const dialogRef = this.dialog.open(ScrapProductComponent, {
      data: {id: id, name: name}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.productService.getProducts().subscribe((data: Product[]) => {
          this.dataSource= data; },
          (err: any) => console.log(err),
        );
      }
    });
    this.table.renderRows();
  }

}

