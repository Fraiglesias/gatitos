import { Injectable } from '@angular/core';
import { ClProducto } from './model/Clproducto';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const apiUrl = "http://127.0.0.1:5000/api/gatitos";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  addProduct(producto: ClProducto): Observable<ClProducto> {
    return this.http.post<ClProducto>(apiUrl, producto, httpOptions).pipe(
      tap((newProduct: ClProducto) => console.log('added product:', newProduct)),
      catchError(this.handleError<ClProducto>('addProduct'))
    );
  }

  getProducts(): Observable<ClProducto[]> {
    return this.http.get<ClProducto[]>(apiUrl).pipe(
      tap(gatitos => console.log('Productos:', gatitos)),
      catchError(this.handleError<ClProducto[]>('getProducts', []))
    );
  }

  getProduct(id: number): Observable<ClProducto | undefined> {
    return this.http.get<ClProducto[]>(apiUrl).pipe(
      map((products) => products.find((product) => product.id === id)), // Filtra el gatito con el `id` específico
      tap((product) => {
        if (product) {
          console.log(`Gatito obtenido con ID=${id}:`, product);
        } else {
          console.log(`No se encontró ningún gatito con ID=${id}`);
        }
      }),
      catchError(this.handleError<ClProducto | undefined>(`getProduct id=${id}`, undefined))
    );
  }

 

  deleteProduct(id: number): Observable<ClProducto> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<ClProducto>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<ClProducto>('deleteProduct'))
    );
  }

  updateProduct(id: number, producto: ClProducto): Observable<ClProducto> {
    const url = `${apiUrl}/${id}`;
    return this.http.put<ClProducto>(url, producto, {
        headers: { 'Content-Type': 'application/json' }
    }).pipe(
        tap((updatedProduct) => console.log(`Producto actualizado: ${updatedProduct}`)),
        catchError(this.handleError<ClProducto>('updateProduct'))
    );
}
  
}
