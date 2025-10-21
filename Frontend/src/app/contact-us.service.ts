import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ContactRequest {
  name: string;
  email: string;
  mobile: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  private apiUrl = 'http://localhost:8080/api/contact/submit_contact';

  constructor(private http: HttpClient) {}

  sendContactMessage(
    contactRequest: ContactRequest
  ): Observable<ContactResponse> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<ContactResponse>(this.apiUrl, contactRequest, {
      headers,
    });
  }
}
