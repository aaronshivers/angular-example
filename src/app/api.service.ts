import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public first = '';
  public prev = '';
  public next = '';
  public last = '';

  private SERVER_URL = 'http://localhost:3000/products';
  private paginatorInfo: any;
  private pageIndex: number;
  private pageSize: number;

  constructor(private httpClient: HttpClient) {
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';

    if (error.error instanceof ErrorEvent) {
      // client side errors
      errorMessage = `Error: ${ error.error.message }`;
    } else {
      // server side errors
      errorMessage = `Error Code: ${ error.status }\nMessage: ${ error.message }`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public sendGetRequest() {
    return this
    .httpClient
    .get(this.SERVER_URL,
      { params: new HttpParams({ fromString: `_page=${ this.pageIndex }&_limit=${ this.pageSize }` }), observe: 'response' })
    .pipe(retry(3), catchError(this.handleError), tap(res => {
      this.parseLinkHeader(res.headers.get('Link'));
    }));
  }

  public sendGetRequestToUrl(url: string) {
    return this.httpClient.get(url, { observe: 'response' }).pipe(retry(3),
      catchError(this.handleError), tap(res => {
        this.parseLinkHeader(res.headers.get('Link'));
      }),
    );
  }


  parseLinkHeader(header) {
    if (header.length === 0) {
      return;
    }

    const parts = header.split(',');
    const links = {
      first: '', last: '', prev: '', next: '',
    };

    parts.forEach(part => {
      const section = part.split(';');
      const url = section[0].replace(/<(.*)>/, '$1').trim();
      const name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;
    });

    this.first = links.first;
    this.last = links.last;
    this.prev = links.prev;
    this.next = links.next;
  }

  getPaginatorInfo(paginatorInfo) {
    console.log(paginatorInfo);
    this.pageIndex = paginatorInfo.pageIndex;
    this.pageSize = paginatorInfo.pageSize;
  }
}
