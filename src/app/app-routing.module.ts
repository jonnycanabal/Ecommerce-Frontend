import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './components/productos/productos.component';
import { TiendasComponent } from './components/tiendas/tiendas.component';
import { InicioComponent } from './layout/inicio/inicio.component';
import { ProductoFormComponent } from './components/productos/producto-form.component';
import { TiendaFormComponent } from './components/tiendas/tienda-form.component';

const routes: Routes = [
  // aqui se enrutan los components que se crean.
  {path:'', pathMatch:'full', redirectTo:'app-inicio'},
  {path:'inicio', component:InicioComponent},
  
  {path: 'productos/ver', component: ProductosComponent},
  {path: 'productos/por-tienda/:tiendaId', component: ProductosComponent},
  {path: 'producto/crear', component: ProductoFormComponent},
  {path: 'producto/editar/:id', component: ProductoFormComponent},
  {path: 'producto/eliminar/:id', component: ProductoFormComponent},

  {path: 'tiendas/ver', component: TiendasComponent},
  {path: 'tiendas/ver/:id', component: TiendasComponent},
  {path: 'tienda/crear', component: TiendaFormComponent},
  {path: 'tienda/editar/:id', component: TiendaFormComponent},
  {path: 'tienda/eliminar/:id', component: TiendaFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
