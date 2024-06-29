import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private apiUrl = 'http://localhost:3000/categories';

  constructor(private httpClient: HttpClient) {}

  // GET heroes whose name contains search term
  searchHeroes(): Observable<any>{
    return this.httpClient.request('GET', this.apiUrl, {responseType:'json'});
  }
  getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((res: HttpResponse<any[]>) => {
        console.log('Response status:', res.status);
        console.log('Body:', res.body);
        return res.body || [];
      }),
    );
  }
}
