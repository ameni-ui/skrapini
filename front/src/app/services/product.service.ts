import { Product } from '../models/product';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScrapedProduct } from 'src/app/models/scraped-product';

@Injectable()
export class ProductService { 

  constructor( private http: HttpClient) { 
  }
  
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/product');
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>('/api/product/'+ productId);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('/api/product',product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>('/api/product/'+ product.id, product);
  }

  deleteProduct(productId: number): Observable<Product> {
    return this.http.delete<Product>('/api/product/'+ productId);
  }

}