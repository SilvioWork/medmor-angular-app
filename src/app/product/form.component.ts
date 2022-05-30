import { Component, OnInit } from '@angular/core';
import { TypeContainer } from "./typecontainer";
import { Product } from "./product";
import { Section } from "../section/section";
import { ProductService } from "./product.service";
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormProductComponent implements OnInit {

  title:string = "Create Product";
  containerType = TypeContainer;
  product: Product = new Product();
  sections:Section[]=[];
  errors: string[] = [];

  constructor(private productService: ProductService, private router:Router, private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
      this.loadProduct();

       this.productService.getSections().subscribe(sections => this.sections = sections);
  }

  /**
   * load Product :void
   */
  public loadProduct():void {
    this.activateRouter.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.productService.getProduct(id).subscribe( (product) => this.product = product )
      }
    })
  }

  /**
   * Create Product :void
   */
  public create(): void{
    this.productService.create(this.product)
        .subscribe(
        response => {
        this.router.navigate(['/product'])
        swal.fire('Save Product', `${response.message}`, 'success')
      },
        err => {
          this.errors = err.error.errors as string[];
          console.error('Code of the error from backend: ' + err.status);
          console.error(err.error.errors);
        }
    );
  }

  /**
   * Update Product :void
   */
  public update(): void {
      console.log(this.product);
      this.productService.update(this.product)
        .subscribe(
          json => {
            this.router.navigate(['/product']);
            swal.fire('Product Updated', `${json.message}`, 'success');
          },
          err => {
            this.errors = err.error.errors as string[];
            console.error('Code of the error from backend: ' + err.status);
            console.error(err.error.errors);
          }
        )
    }

    compareSection(obj1:Section, obj2:Section): boolean{
      if(typeof obj1 === "undefined"  && typeof obj2 === "undefined" ){
        console.log("Seleccione la Seccion")
        return true;
      }
      return obj1 == null || obj2 == null? false: obj1.id == obj2.id;
    }

}
