import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppComponent } from './app.component';
import { ProductService } from './services/product.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { ProductCardComponent } from './client/product-card/product-card.component';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
import { ProductListComponent } from './client/product-list/product-list.component';
import { LoginComponent } from './admin/login/login.component';
import { ProductTableComponent } from './admin/product-table/product-table.component';
import { HomeComponent } from './client/home/home.component';
import { ProductPageComponent } from './client/product-page/product-page.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AddProductComponent } from './admin/product-table/add-product/add-product.component';
import { DeleteProductComponent } from './admin/product-table/delete-product/delete-product.component';
import { UpdateProductComponent } from './admin/product-table/update-product/update-product.component';
import { ScrapProductComponent } from './admin/product-table/scrap-product/scrap-product.component';
import { SignupComponent } from './admin/signup/signup.component'; 
import { ScrapedProductService } from './services/scraped-product.service';


@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    ProductListComponent,
    LoginComponent,
    ProductTableComponent,
    HomeComponent,
    ProductPageComponent,
    AddProductComponent,
    DeleteProductComponent,
    UpdateProductComponent,
    ScrapProductComponent,
    SignupComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatGridListModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  providers: [
    ProductService,
    ScrapedProductService,
    { provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {
    registerLocaleData(fr.default);
  }
}
