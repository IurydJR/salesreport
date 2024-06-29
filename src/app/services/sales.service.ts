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
  getAll(): Observable<any>{
    return this.httpClient.request('GET', this.apiUrl, {responseType:'json'});
  }


  getSaleById(id: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/${id}`);
  }

  createSale(sale: any): Observable<any> {
    return this.httpClient.post(this.apiUrl, sale);
  }

  updateSale(id: number, sale: any): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${id}`, sale);
  }

  deleteSale(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
  
}
