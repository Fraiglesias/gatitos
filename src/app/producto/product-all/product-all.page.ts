import { Component } from '@angular/core';
import { ClProducto } from '../model/Clproducto';
@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.page.html',
  styleUrls: ['./product-all.page.scss'],
})
export class ProductAllPage  {
  msgError = ""
  buttonEliminarDisabled = false
  buttonLeerDisabled = false
  buttonActualizarDisabled = false
  buttonCrearDisabled = false
  producto: ClProducto = {
    id: 0,            // ID del gatito
    name: '',         // Nombre del gatito
    breed: '',        // Raza del gatito
    age: 0,           // Edad en años
    birthdate: '',    // Fecha de nacimiento
    description: '',  // Descripción
  };;
  constructor() { }
  
  public id: string = "";


  leer() {}
  eliminar() { }
  grabar() { }
  actualizar() { }
  grabarActualizarAutomatico() { }
}
