import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';
import { HttpService } from '../../../services/http-service.service';

const url = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private httpService: HttpService) { }

  addCategory(categoryDto: any): Observable<any> {
    return this.httpService.post('api/admin/category', categoryDto, {
      headers: this.createAthorizationHeader(),
    });
  }

  private createAthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }
}
