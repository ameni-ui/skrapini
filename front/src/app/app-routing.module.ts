import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { SignupComponent } from './admin/signup/signup.component';
import { ProductTableComponent } from './admin/product-table/product-table.component';
import { HomeComponent } from './client/home/home.component';
import { ProductListComponent } from './client/product-list/product-list.component';
import { ProductPageComponent } from './client/product-page/product-page.component';
import { AuthGuard } from './admin/guard/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product', component: ProductListComponent },
  { path: 'product/:id', component: ProductPageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: ProductTableComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
