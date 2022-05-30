import { Component, OnInit } from '@angular/core';
import { Section } from "../section";
import { Product } from "../../product/product";
import { SectionService } from '../section.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';


@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  products: Product[]=[];

  constructor( private sectionService: SectionService, private ativateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.ativateRoute.paramMap.subscribe(
      params=>{
        let id = params.get('id');
        if(id){
          this.sectionService. productBySection(Number(id)).subscribe(
            product =>  this.products =product);
        }
      });
  }






}
