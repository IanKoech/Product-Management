import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError,tap} from 'rxjs/operators';

import {IProduct} from './product';

@Injectable({
  providedIn:'root'
})

export class ProductService{
  private productUrl='api/products/products.json';

  constructor(private http:HttpClient){}

  getProducts():Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap(data => console.log('All: '+JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err:HttpErrorResponse){
    //In a real world scenario, we would send the server to a remote logging infrastructure
    //Instead, we log it to the console
    let errorMessage='';
    if(err.error instanceof ErrorEvent){
      //A client side or network error occurred, handle it accordingly
      errorMessage=`An error occurred: ${err.error.message}`;
    }else {
      //The backend returned an unsuccessful response code
      //The response body may contain clues as to what went wrong
      errorMessage=`Server returned code: ${err.status}, error messae is: ${err.message}`
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}