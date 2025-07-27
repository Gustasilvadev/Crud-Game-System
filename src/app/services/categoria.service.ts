import { environment } from './../environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Categoria } from '../interfaces/categoria';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private UrlApi = environment.API

  constructor(private http:HttpClient) { }

  listarCategoria(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`${this.UrlApi}/api/categoria`, httpOptions)
    .pipe(
        catchError(this.errorHandler)
    )
  }


  criarCategoria(categoria:Categoria): Observable<any>{
    return this.http.post(`${this.UrlApi}/api/categoria/`,categoria, httpOptions)
    .pipe(
        catchError(this.errorHandler)
    )
  }


  apagarCategoria(id:number){
    return this.http.delete(`${this.UrlApi}/api/categoria/` + id, httpOptions)
    .pipe(
        catchError(this.errorHandler)
    )
  }


  buscarCategoria(id:number): Observable<any>{
    return this.http.get(`${this.UrlApi}/api/categoria/` + id, httpOptions)
    .pipe(
        catchError(this.errorHandler)
    )
  }


  atualizarCategoria(id:number,categoria:Categoria): Observable<any>{
    return this.http.put(`${this.UrlApi}/api/categoria/`+ id, categoria, httpOptions)
    .pipe(
        catchError(this.errorHandler)
    )
  }


  errorHandler(error:any) {
      let errorMessage = '';
      if(error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(errorMessage);
    }
}
