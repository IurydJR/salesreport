import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private httpClient: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.httpClient.get(this.apiUrl);
  }

  getUserById(id: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/${id}`);
  }

  getUserByUsername(username: string): Observable<any> {
    return this.getAllUsers().pipe(
      map(users => users.find((us:any) => us.username === username))
    );
  }

  createUser(user: any): Observable<any> {
    return this.httpClient.post(this.apiUrl, user);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
