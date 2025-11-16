import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ErrorComponent } from './pages/error-page/error.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { JobManagementPageComponent } from './pages/job-management-page/job-management-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'about',
    component: AboutPageComponent,
  },
  {
    path: 'contact',
    component: ContactPageComponent,
  },
  {
    path: 'cart',
    component: CartPageComponent,
  },
  {
    path: 'sub-product/:id',
    component: ProductPageComponent,
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
  },
  {
    path: 'job-management',
    component: JobManagementPageComponent,
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];
