import { Component, OnInit } from '@angular/core';
import { TypeProduct } from "./typeProduct";
import { Section } from "./section";
import { SectionService } from "./section.service";
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  title:string = "Create Section"
  typeProduct = TypeProduct;
  section: Section = new Section();
  errors: string[] = [];


  constructor( private sectionService: SectionService, private router:Router, private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadSections();
  }

  /**
   * Create Section :void
   */
  public create(): void{
    this.sectionService.create(this.section)
        .subscribe(
        response => {
        this.router.navigate(['/section'])
        swal.fire('Save Section', `${response.message}`, 'success')
      },
        err => {
          this.errors = err.error.errors as string[];
          console.error('Code of the error from backend: ' + err.status);
          console.error(err.error.errors);
        }
    );
  }

  /**
  * Update Secton : void
  */
  update (): void{
    this.sectionService.update(this.section)
    .subscribe(
    response => {
      this.router.navigate(['/section'])
      swal.fire('Update Section', `${response.message}`, 'success')
      },
        err => {
          this.errors = err.error.errors as string[];
          console.error('Code of the error from backend: ' + err.status);
          console.error(err.error.errors);
        }
    );
  }


/**
 * load Section :void
 */
public loadSections():void {
  this.activateRouter.params.subscribe(params => {
    let id = params['id']
    if(id){
      this.sectionService.getSection(id).subscribe( (section) => this.section = section )
    }
  })
}

}
