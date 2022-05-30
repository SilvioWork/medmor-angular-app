import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'paginator-section-nav',
  templateUrl: './paginator.component.html'
})
export class PaginatorSectionComponent implements OnInit, OnChanges {
@Input() paginator: any;
paginas: number[]=[];

desde: number=0;
hasta: number=0;

constructor() { }

ngOnInit(): void {

}

ngOnChanges(){
  this.desde = Math.min(Math.max(1, this.paginator.number - 4), this.paginator.totalPages - 5);
  this.hasta = Math.max(Math.min(this.paginator.totalPages, this.paginator.number + 4), 6);
  if (this.paginator.totalPages > 5) {
    this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((_valor, indice) => indice + this.desde);
  } else {
    this.paginas = new Array(this.paginator.totalPages).fill(0).map((_valor, indice) => indice + 1);
  }
}

}
