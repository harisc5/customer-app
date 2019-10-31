import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private httpClient: HttpClient) {
  }

  post(url, body) {
    return this.httpClient.post(url, JSON.stringify(body), {headers: this.headers})
      .pipe(
        retry(1),
        catchError(error => throwError(error))
      );
  }

  get(url) {
    return this.httpClient.get(url)
      .pipe(
        retry(1),
        catchError(error => throwError(error))
      );
  }

  delete(url) {
    return this.httpClient.delete(url).pipe(
      retry(1),
      catchError(error => throwError(error))
    );
  }
}
