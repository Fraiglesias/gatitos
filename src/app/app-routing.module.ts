import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard'; // Importa el guard
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'product-add',
    loadChildren: () => import('./producto/product-add/product-add.module').then( m => m.ProductAddPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'product-all',
    loadChildren: () => import('./producto/product-all/product-all.module').then( m => m.ProductAllPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'product-detail/:id',
    loadChildren: () => import('./producto/product-detail/product-detail.module').then( m => m.ProductDetailPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'product-edit/:id',
    loadChildren: () => import('./producto/product-edit/product-edit.module').then( m => m.ProductEditPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'product-list',
    loadChildren: () => import('./producto/product-list/product-list.module').then( m => m.ProductListPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'cart',
    loadChildren: () => import('./producto/cart/cart.module').then( m => m.CartPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'buscar',
    loadChildren: () => import('./buscar/buscar.module').then( m => m.BuscarPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./cuenta/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./cuenta/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./cuenta/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'camara',
    loadChildren: () => import('./capacitor/camara/camara.module').then( m => m.CamaraPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'maps',
    loadChildren: () => import('./capacitor/maps/maps.module').then( m => m.MapsPageModule), canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
