import { Injectable } from '@angular/core';
import { Product } from "./product";
import { Section } from "../section/section";
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private urlEndPoint: string = "http://localhost:8080/api/product";
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'});
  private urlEndPointSection: string = "http://localhost:8080/api/section";

  constructor(private http: HttpClient, private router: Router) { }


  getProducts(page: number): Observable<any> {
      return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
        tap((response: any) => {
          console.log('ProductService: tap 1');
          (response.content as Product[]).forEach(product => console.log(product.lot));
        }),
        map((response: any) => {
          (response.content as Product[]).map(product => {
            product.lot = product.lot.toUpperCase();
            return product;
          });
          return response;
        }),
        tap(response => {
          console.log('ProductService: tap 2');
          (response.content as Product[]).forEach(product => console.log(product.lot));
        })
      );
    }

  create(product: Product): Observable<any>{
    console.log(product)
    return this.http.post<any>(this.urlEndPoint, product, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if (e.status == 400) {
           swal.fire('Error to Create', e.error.errors[0], 'error');
           return throwError(e);
         }
        swal.fire('Error', e.message, 'error');
        return throwError(e);
      })
    );
  }

  getProduct(id:number):Observable<Product>{
    return this.http.get<Product>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/product']);
        swal.fire('Error to Edit', e.error.message, 'error');
        return throwError(e);
      })
    );
  }

  update(product: Product): Observable<any> {
      return this.http.put<any>(`${this.urlEndPoint}/${product.id}`, product,  {headers: this.httpHeaders}).pipe(
        catchError(e => {
          if (e.status == 400) {
            swal.fire('Error to Update', e.error.errors[0], 'error');
            return throwError(e);
          }
          swal.fire("Error", e.error.error, 'error');
          return throwError(e);
        })
      );
    }

    delete(id: number): Observable<Product> {
        return this.http.delete<Product>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
          catchError(e => {
            console.error(e.error.message);
            swal.fire("Error", e.error.error, 'error');
            return throwError(e);
          })
        );
      }


      getSections(): Observable<Section[]>{
       return this.http.get<Section[]>(this.urlEndPointSection);
      }

}
