import { Product } from '../models/product';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScrapedProduct } from 'src/app/models/scraped-product';

@Injectable()
export class ScrapedProductService { 

  constructor( private http: HttpClient) { 
  }
  
  scrapProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('/api/product/scrap',product);
  }

  getScrapedProductsById(productId: number): Observable<ScrapedProduct[]> {
    return this.http.get<ScrapedProduct[]>('/api/product/scrap/'+ productId);
  }
}