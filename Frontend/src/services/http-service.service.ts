import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, Observable, of, timeout } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { DropDownData, PaginationRequest } from './Dto';

@Injectable({
  providedIn: 'root'
})
export class HttpService {



  baseUrl = environment.baseUrl;

  private defaultTimeout = 10 * 60 * 1000;

  destroyRef = inject(DestroyRef)

  constructor(private readonly httpClient: HttpClient) {
  }

  getImage(url: string, id?: any) {
    if (id) {
      return this.httpClient.get(`${this.baseUrl}/${url}/${id}/image`, { responseType: 'blob' }).pipe(timeout(this.defaultTimeout), takeUntilDestroyed(this.destroyRef));
    } else {
      return this.httpClient.get(`${this.baseUrl}/${url}/image`, { responseType: 'blob' }).pipe(timeout(this.defaultTimeout), takeUntilDestroyed(this.destroyRef));
    }
  }


  getImageUrl(url: string, id: any) {
    return `${this.baseUrl}/${url}/${id}/image`;
  }

  getImageUrlOnly(url: string) {
    return `${this.baseUrl}/${url}`;
  }


  private cache: { [url: string]: DropDownData[] } = {};

  getItems(url: string, search: string = ''): Observable<DropDownData[]> {
    if (search === '' && this.cache[url]) {
      return of(this.cache[url]);
    }
    return this.httpClient.get<DropDownData[]>(`${this.baseUrl}/${url}?query=${search}`).pipe(
      timeout(this.defaultTimeout),
      takeUntilDestroyed(this.destroyRef),
      tap(response => {
        if (search === '') {
          this.cache[url] = response;
        }
      })
    );
  }
  clearItemCache(url: string) {
    this.cache = {};
  }


  get(url: string) {
    return this.httpClient.get(`${this.baseUrl}/${url}`).pipe(timeout(this.defaultTimeout), takeUntilDestroyed(this.destroyRef));
  }

  delete(url: string) {
    return this.httpClient.delete(`${this.baseUrl}/${url}`).pipe(timeout(this.defaultTimeout), takeUntilDestroyed(this.destroyRef));
  }

  post(url: string, value: any, options?: any) {
    return this.httpClient.post(`${this.baseUrl}/${url}`, value, options).pipe(timeout(this.defaultTimeout), takeUntilDestroyed(this.destroyRef));
  }

  put(url: string, value: any) {
    return this.httpClient.put(`${this.baseUrl}/${url}`, value).pipe(timeout(this.defaultTimeout), takeUntilDestroyed(this.destroyRef));
  }

  patch(url: string, value: any) {
    return this.httpClient.patch(`${this.baseUrl}/${url}`, value).pipe(timeout(this.defaultTimeout), takeUntilDestroyed(this.destroyRef));
  }

  dataTable(url: string, filter: PaginationRequest) {
    return this.httpClient.post(`${this.baseUrl}/${url}/page`, filter).pipe(timeout(this.defaultTimeout), takeUntilDestroyed(this.destroyRef));
  }

  downloadExcel(url: string) {
    this.downloadFile(`${this.baseUrl}/${url}/export`).pipe(timeout(this.defaultTimeout), takeUntilDestroyed(this.destroyRef)).subscribe(
      (event) => {
        if (event.type === HttpEventType.Response && event.body) {
          this.handleExcelDownload(event.body, 'expport_file.xlsx');
        }
      }
    );
  }

  downloadExcelTemplate(url: string, fileName?: string) {
    this.downloadFile(`${this.baseUrl}/${url}`).pipe(timeout(this.defaultTimeout), takeUntilDestroyed(this.destroyRef)).subscribe(
      (event) => {
        if (event.type === HttpEventType.Response && event.body) {
          this.handleExcelDownload(event.body, fileName || 'template.xlsx');
        }
      }
    );
  }

  download(url: string, fileName: string) {
    this.downloadFile(`${this.baseUrl}/${url}`).pipe(timeout(this.defaultTimeout), takeUntilDestroyed(this.destroyRef)).subscribe(
      (event) => {
        if (event.type === HttpEventType.Response && event.body) {
          this.handleExcelDownload(event.body, fileName);
        }
      }
    );
  }

  downloadPdf(url: string, fileName: string, method?: string, data?: any) {
    return new Observable(observer => {
      this.downloadFile(`${this.baseUrl}/${url}`, method, data).pipe(timeout(this.defaultTimeout), takeUntilDestroyed(this.destroyRef)).subscribe(
        (event) => {
          if (event.type === HttpEventType.Response && event.body) {
            this.handlePdfDownload(event.body);
            observer.next(event); // Emit the event
            observer.complete(); // Complete the observable
          }
        },
        (error) => {
          console.error('Error downloading file:', error);
          observer.error(error); // Emit the error
          // this.loaderService.stopLoading();
        }
      );
    });
  }
  handlePdfDownload(blob: Blob) {
    const blobUrl = URL.createObjectURL(blob);
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = blobUrl;
    document.body.appendChild(iframe);
    if (iframe.contentWindow) {
      iframe.contentWindow.print();
    }
  }


  downloadFile(url: string, method?: string, data?: any): Observable<HttpEvent<Blob>> {
    const options: { responseType: 'blob'; reportProgress: true; observe: 'events' } = {
      responseType: 'blob',
      reportProgress: true,
      observe: 'events',
    };
    if (method === 'POST') {
      return this.httpClient.post(url, data, options).pipe(timeout(this.defaultTimeout), takeUntilDestroyed(this.destroyRef)) as Observable<HttpEvent<Blob>>
    } if (method === 'PUT') {
      return this.httpClient.put(url, data, options).pipe(timeout(this.defaultTimeout), takeUntilDestroyed(this.destroyRef)) as Observable<HttpEvent<Blob>>
    } else {
      return this.httpClient.get(url, options).pipe(timeout(this.defaultTimeout), takeUntilDestroyed(this.destroyRef)) as Observable<HttpEvent<Blob>>
    }
  }

  private handleExcelDownload(blob: Blob, fileName: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName; // Set the desired file name
    a.click();
    window.URL.revokeObjectURL(url);
  }


  login(credentials: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/auth', credentials).pipe(
      takeUntilDestroyed(this.destroyRef),
      timeout(this.defaultTimeout)
    );
  }

  public refreshAccessToken(refreshToken: any) {
    const header = new HttpHeaders({
      'token': refreshToken
    });

    return this.httpClient.get(this.baseUrl + '/auth/refresh', {
      headers: header,
      responseType: 'text'
    }).pipe(
      takeUntilDestroyed(this.destroyRef),
      timeout(this.defaultTimeout),
    );
  }

  uploadFile(url: string, file: File): Observable<number> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const uploadReq = new HttpRequest('POST', `${this.baseUrl}/${url}`, formData, {
      reportProgress: true,
    });

    return this.httpClient.request(uploadReq).pipe(
      map(event => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round((100 * event.loaded) / (event.total || 0));
          return percentDone;
        } else if (event instanceof HttpResponse) {
          return 100;
        }
        return 0;
      })
    );
  }

}
