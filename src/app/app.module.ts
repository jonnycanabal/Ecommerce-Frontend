import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosComponent } from './components/productos/productos.component';
import { TiendasComponent } from './components/tiendas/tiendas.component';
import { LayoutModule } from './layout/layout.module';
import { ProductoFormComponent } from './components/productos/producto-form.component';
import { FormsModule } from '@angular/forms'; // este modulo incluye atributos form de angular

import { DatePipe } from '@angular/common';
import { TiendaFormComponent } from './components/tiendas/tienda-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    TiendasComponent,
    ProductoFormComponent,
    TiendaFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    FormsModule //importar el modulo de formula de Angular
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
