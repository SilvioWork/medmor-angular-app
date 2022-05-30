import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SectionComponent } from './section/section.component';
import { SectionService } from './section/section.service';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './section/form.component';
import { FormProductComponent } from './product/form.component';
import { FormsModule } from '@angular/forms';
import { PaginatorSectionComponent } from './section/paginator/paginator.component';
import { PaginatorProductComponent } from './product/paginator/paginator.component';
import { ProductComponent } from './product/product.component';
import { DetalleComponent } from './section/detalle/detalle.component';

const routes: Routes = [
  {path: '', redirectTo: '/section', pathMatch:'full'},
  {path: 'section', component:SectionComponent},
  {path: 'section/form', component:FormComponent},
  {path: 'section/form/:id', component:FormComponent},
  {path: 'section/page/:page', component: SectionComponent },
  {path: 'product/page/:page', component: ProductComponent },
  {path: 'product', component:ProductComponent},
  {path: 'product/form', component:FormProductComponent},
  {path: 'product/section/:id', component: DetalleComponent},
  {path: 'product/form/:id', component:FormProductComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SectionComponent,
    FormComponent,
    ProductComponent,
    PaginatorSectionComponent,
    PaginatorProductComponent,
    FormProductComponent,
    DetalleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [SectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
