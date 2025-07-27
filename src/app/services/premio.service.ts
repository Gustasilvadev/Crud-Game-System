import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Premio } from '../interfaces/premio';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};


@Injectable({
  providedIn: 'root'
})
export class PremioService {

  private UrlApi = environment.API
  constructor(private http:HttpClient) { }

  listarPremio():Observable<Premio[]>{
    return this.http.get<Premio[]>(`${this.UrlApi}/api/premio`, httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  criarPremio(premio:Premio): Observable<any>{
    return this.http.post(`${this.UrlApi}/api/premio`, premio, httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  apagarPremio(id:number){
      return this.http.delete(`${this.UrlApi}/api/premio/` + id, httpOptions)
      .pipe(
          catchError(this.errorHandler)
      )
    }


    buscarPremio(id:number): Observable<any>{
      return this.http.get(`${this.UrlApi}/api/premio/`+ id, httpOptions)
      .pipe(
          catchError(this.errorHandler)
      )
    }


    atualizarPremio(id:number,premio:Premio): Observable<any>{
      return this.http.put(`${this.UrlApi}/api/premio/`+ id, premio, httpOptions)
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
