import { Injectable } from '@angular/core';
import {Section} from "./section";
import {Product} from "../product/product";
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import swal from 'sweetalert2';


@Injectable()
export class SectionService {

  private urlEndPoint: string = "http://localhost:8080/api/section"
  private urlEndPointProd: string = "http://localhost:8080/api/product"
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'});

  constructor(private http: HttpClient, private router: Router) { }


  getSections(page: number): Observable<any> {
      return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
        tap((response: any) => {
          console.log('SectionService: tap 1');
          (response.content as Section[]).forEach(section => console.log(section.typeProduct));
        }),
        map((response: any) => {
          (response.content as Section[]).map(section => {
            section.typeProduct = section.typeProduct;
            return section;
          });
          return response;
        }),
        tap(response => {
          console.log('SectionService: tap 2');
          (response.content as Section[]).forEach(section => console.log(section.typeProduct));
        })
      );
    }


  getSection(id:number):Observable<Section>{
    return this.http.get<Section>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/section']);
        console.error(e.error.message);
        swal.fire('Error to Edit', e.error.message, 'error');
        return throwError(e);
      })
    );
  }

 create(section: Section): Observable<any>{
   return this.http.post<any>(this.urlEndPoint, section, {headers: this.httpHeaders}).pipe(
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

 update(section:Section):Observable<any>{
   return this.http.put<any>(`${this.urlEndPoint}/${section.id}`, section, {headers: this.httpHeaders}).pipe(
     catchError(e=>{
       if (e.status == 400) {
          swal.fire('Error to Update', e.error.errors[0], 'error');
          return throwError(e);
        }
       swal.fire('Error', e.message, 'error');
       return throwError(e);
     })
   );
 }

 delete(id:number):Observable<Section>{
     return this.http.delete<Section>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
 }

 productBySection(id:number):Observable<Product[]>{
     return this.http.get<Product[]>(`${this.urlEndPointProd}/section/${id}`);
 }

}
