import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage implements OnInit {
  imageUrl: string | undefined;  // Propiedad para almacenar la URL de la imagen

  constructor() { }
  ngOnInit(): void {
    ;
  }
 



  // Cambiamos la declaración a una función async con flecha
  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });

    this.imageUrl = image.webPath;  // Asigna la URL de la imagen a la propiedad
    console.log("Image URL:", this.imageUrl);
  }
}
