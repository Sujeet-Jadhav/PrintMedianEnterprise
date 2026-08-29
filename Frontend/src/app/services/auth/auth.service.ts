import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { UserStorageService } from './../storage/user-storage.service';
import { environment } from '../../../environments/environment';
import { HttpService } from '../../../services/http-service.service';

// const url = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpService: HttpService,
    private userStorageService: UserStorageService
  ) { }

  login(userName: string, password: string): any {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { userName, password };

    return (this.httpService
      .post('api/auth/login', body, { headers, observe: 'response' }) as unknown as Observable<HttpResponse<any>>)
      .pipe(
        map((res) => {
          const token = res.headers.get('authorization')?.substring(7);
          const user = res.body;
          if (token && user) {
            this.userStorageService.saveToken(token);
            this.userStorageService.saveUser(user);
            return true;
          }
          return false;
        }),
        catchError((error) => {
          console.error('Error during login:', error);
          return throwError(() => error);
        })
      );
  }

  register(signupRequest: any): Observable<any> {
    return this.httpService.post('api/auth/sign_up', signupRequest).pipe(
      catchError((error) => {
        console.error('Error registering user:', error);
        return throwError(() => error);
      })
    );
  }
}
