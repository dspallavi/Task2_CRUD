import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { UserDetails } from './user.modal';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUri:string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  isUserupdated$ = new BehaviorSubject<boolean>(false);
  isUserSelected$ = new BehaviorSubject<string>('');

  constructor(private httpClient: HttpClient) {  }

  // Get all users
  getUserList(): Observable<any> {
    return this.httpClient.get(`${this.baseUri}`);
  }

   // Create
   createUser(data: UserDetails): Observable<any> {
    let url = `${this.baseUri}/create`;
    return this.httpClient.post(url, data).pipe(catchError(this.errorMgmt));
  }

   // Get user
  getUser(id: string): Observable<any> {
    let url = `${this.baseUri}/read/${id}`;
    return this.httpClient.get(url, {headers: this.headers}).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  
  // Update user
  updateUser(id: any, data: any): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    delete data._id;
    return this.httpClient.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete user
  deleteUser(id: string): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.httpClient.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Validate User 
  validateUser(data: any): Observable<any> {
    let url = `${this.baseUri}/validate`;
    return this.httpClient.post(url, data).pipe(catchError(this.errorMgmt));
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
