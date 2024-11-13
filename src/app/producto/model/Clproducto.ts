export class ClProducto {

    id?: number | null;            // ID del gatito
    name: string;           // Nombre del gatito
    breed: string;          // Raza del gatito
    age: number;            // Edad en años
    birthdate: string;      // Fecha de nacimiento
    description: string;    // Descripción

    // Constructor para recibir datos JSON
    constructor(jsonData: any) {
        this.id = jsonData.id;
        this.name = jsonData.name;
        this.breed = jsonData.breed;
        this.age = jsonData.age;
        this.birthdate = jsonData.birthdate;
        this.description = jsonData.description;
    }
}
  