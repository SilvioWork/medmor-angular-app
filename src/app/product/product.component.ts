import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import swal from "sweetalert2";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {
  products: Product[] =[];
  paginator:any;

  constructor(private productService:ProductService, private activatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
          let page: number = Number(params.get('page')?.toString());

          if (!page) {
            page = 0;
          }

          this.productService.getProducts(page)
            .pipe(
              tap(response => {
                console.log('ProductService: tap 3');
                (response.content as Product[]).forEach(product => console.log(product.lot));
              })
            ).subscribe(response => {
              this.products = response.content as Product[];
              this.paginator = response;
            });
        });
  }

  /**
   * Delete Section: void
   */
  public delete( product: Product): void {
  swal.fire({
   title: 'Are you sure?',
   text: `Are you sure you want to delete the Section for: ${product.lot} component` ,
   icon: 'warning',
   showCancelButton: true,
   confirmButtonColor: '#3085d6',
   cancelButtonColor: '#d33',
   confirmButtonText: 'Yes, delete it!'
 }).then((result) => {
  if (result.isConfirmed) {
      this.productService.delete(product.id).subscribe(
            () => {
            this.products = this.products.filter(cli => cli !== product)
            swal.fire(
            'Deleted!',
            'Your Product has been deleted.',
            'success'
           )
          }
      )
   }
  })
  }

}
