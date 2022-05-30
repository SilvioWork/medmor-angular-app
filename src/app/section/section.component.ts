import { Component, OnInit } from '@angular/core';
import { Section } from './section';
import { Product } from '../product/product';
import { SectionService } from './section.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import swal from "sweetalert2";


@Component({
  selector: 'app-section',
  templateUrl: './section.component.html'
})
export class SectionComponent implements OnInit {
  sections: Section[] =[];
  products: Product[] =[];
  paginator:any;

  constructor( private sectionService: SectionService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
          let page: number = Number(params.get('page')?.toString());

          if (!page) {
            page = 0;
          }

          this.sectionService.getSections(page)
            .pipe(
              tap(response => {
                console.log('ClientesComponent: tap 3');
                (response.content as Section[]).forEach(cliente => console.log(cliente.typeProduct));
              })
            ).subscribe(response => {
              this.sections = response.content as Section[];
              this.paginator = response;
            });
        });
  }

  /**
   * Delete Section: void
   */
  public delete( section: Section): void {
  swal.fire({
   title: 'Are you sure?',
   text: `Are you sure you want to delete the Section for: ${section.typeProduct} component` ,
   icon: 'warning',
   showCancelButton: true,
   confirmButtonColor: '#3085d6',
   cancelButtonColor: '#d33',
   confirmButtonText: 'Yes, delete it!'
 }).then((result) => {
  if (result.isConfirmed) {
      this.sectionService.delete(section.id).subscribe(
            () => {
            this.sections = this.sections.filter(cli => cli !== section)
            swal.fire(
            'Deleted!',
            'Your section has been deleted.',
            'success'
           )
          }
      )
   }
  })
  }


productBySection(id:number):void{
  this.sectionService.productBySection(id).subscribe(
    product => this.products as Product[]
    );
}


}
