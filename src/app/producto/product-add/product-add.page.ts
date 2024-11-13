import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ClProducto } from '../model/Clproducto';

import { ProductServiceService } from '../product-service.service';

let ultimoId = 3;

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.page.html',
  styleUrls: ['./product-add.page.scss'],
})
export class ProductAddPage implements OnInit {
  
  productForm!: FormGroup;
  
  producto: ClProducto = {
    id: null,           // ID del gatito
    name: '',         // Nombre del gatito
    breed: '',        // Raza del gatito
    age: 0,           // Edad en años
    birthdate: '',    // Fecha de nacimiento
    description: '',  // Descripción
  };
  
  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private restApi: ProductServiceService,
    private router: Router,
  ) { }

  ngOnInit() {
    // Configuración de los campos de formulario para los datos de gatitos
    this.productForm = this.formBuilder.group({
      name: [null, Validators.required],
      breed: [null, Validators.required],
      age: [null, [Validators.required, Validators.min(0)]],
      birthdate: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  // Método que se ejecuta cuando se envía el formulario
  async onFormSubmit(form: NgForm) {
    console.log("onFormSubmit del Gatito ADD");

    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();

    // Ejecuta el método del servicio y los suscribe
    this.restApi.addProduct(this.producto).subscribe({
      next: (res) => {
        console.log("Next AddGatito Page", res);
        loading.dismiss();
        if (res == null) {
          console.log("Next No Agrego, Ress Null ");
          return;
        }
        console.log("Next Agrego SIIIIII Router saltaré ;", this.router);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log("Error AddGatito Página", err);
        loading.dismiss();
      }
    });
    console.log("Observe que todo lo del suscribe sale después de este mensaje");
}
}
