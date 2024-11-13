import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClProducto } from '../model/Clproducto';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.page.html',
  styleUrls: ['./product-edit.page.scss'],
})
export class ProductEditPage implements OnInit {

  productForm!: FormGroup;
  producto: ClProducto = {
    id: 0,
    name: '',
    breed: '',
    age:0,
    birthdate: '',
    description: ''
  };
  id: number | undefined;

  constructor(
    private productService: ProductServiceService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // Inicializar el formulario
    this.productForm = this.formBuilder.group({
      prod_name: [null, Validators.required],
      prod_breed: [null, Validators.required],
      prod_age: [null, Validators.required],
      prod_birthdate: [null, Validators.required],
      prod_description: [null, Validators.required]
    });

    // Obtener el ID del gatito de la URL y cargar sus datos
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.getProduct(id);
  }

  async getProduct(id: number) {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
  
    this.productService.getProduct(id).subscribe({
      next: (product) => {
        if (product) { // Verificación de que `product` no es undefined
          console.log("Datos del gatito obtenidos:", product);
          this.producto = product; // Asigna el objeto completo `product` a `this.producto`
          this.id = product.id ?? undefined;
  
          // Usar `setTimeout` para aplicar los valores después de un breve retraso
          setTimeout(() => {
            this.productForm.setValue({
              prod_name: product.name,
              prod_breed: product.breed,
              prod_age: product.age,
              prod_birthdate: product.birthdate,
              prod_description: product.description
            });
            console.log("Valores del formulario después de setValue:", this.productForm.value);
          });
        } else {
          console.warn("No se encontró el producto con el ID:", id);
        }
  
        loading.dismiss();
      },
      error: (err) => {
        console.error("Error al obtener los datos del gatito:", err);
        loading.dismiss();
      }
    });
  }

  cancel() {
    this.router.navigate(['/product-list']);
  }
  

  async onFormSubmit() {
    if (this.productForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Actualizando...'
      });
      await loading.present();
  
      // Actualizar el objeto `producto` con los valores del formulario
      this.producto = {
        ...this.producto,
        name: this.productForm.value.prod_name,
        breed: this.productForm.value.prod_breed,
        age: this.productForm.value.prod_age,
        birthdate: this.productForm.value.prod_birthdate,
        description: this.productForm.value.prod_description
      };
  
      // Llamar al servicio para actualizar el producto
      this.productService.updateProduct(this.id!, this.producto).subscribe({
        next: (res) => {
          console.log('Producto actualizado:', res);
          loading.dismiss();
          this.router.navigate(['/product-detail', this.id]);
        },
        error: (err) => {
          console.error('Error al actualizar producto:', err);
          loading.dismiss();
        }
      });
    } else {
      console.log("Formulario inválido");
    }
  }
}
