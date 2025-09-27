import { DestroyRef, inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  baseUrl = environment.baseUrl;

  private defaultTimeout = 30000;

  destroyRef = inject(DestroyRef);

  constructor(private readonly httpClient: HttpClient) {}

  get(url: string): Observable<any> {
    return this.httpClient
      .get(`${this.baseUrl}/${url}`)
      .pipe(timeout(this.defaultTimeout), takeUntilDestroyed(this.destroyRef));
  }

  getImage(number: number) {
    return `${this.baseUrl}/image/${number}`;
  }

  getItemImage(url: string, id: string) {
    return `${this.baseUrl}/${url}/image/${id}`;
  }

  getProductImage(url: string, id: string, number: number) {
    return `${this.baseUrl}/${url}/image/${id}/${number}`;
  }

  getDetails() {
    return this.httpClient
      .get(`${this.baseUrl}/ecommerce`)
      .pipe(timeout(this.defaultTimeout), takeUntilDestroyed(this.destroyRef));
  }

  getLogoImage(url: string, id: any) {
    return this.httpClient
      .get(`${this.baseUrl}/${url}/${id}/image`, { responseType: 'blob' })
      .pipe(timeout(this.defaultTimeout), takeUntilDestroyed(this.destroyRef));
  }

  post(url: string, value: any) {
    return this.httpClient
      .post(`${this.baseUrl}/${url}`, value)
      .pipe(timeout(this.defaultTimeout), takeUntilDestroyed(this.destroyRef));
  }
}
