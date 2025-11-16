import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { QuotationComponent } from './components/quotation/quotation.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ErrorComponent } from './pages/error-page/error.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { JobManagementPageComponent } from './pages/job-management-page/job-management-page.component';

@NgModule({
  declarations: [], // Components, directives, and pipes that belong to this module
  providers: [provideAnimationsAsync()], // Services and other providers (dependency injection)
  bootstrap: [], // Root component that starts the app
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FooterComponent,
    HeaderComponent,
    HomePageComponent,
    AboutPageComponent,
    CartPageComponent,
    ContactPageComponent,
    ErrorComponent,
    ProductPageComponent,
    QuotationComponent,
    DashboardPageComponent,
    JobManagementPageComponent,
  ], // Other modules whose features we need
})
export class AppModule {}
