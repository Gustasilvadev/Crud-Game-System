import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { Patrocinador } from '../interfaces/patrocinador';
import { catchError, Observable, throwError } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};



@Injectable({
  providedIn: 'root'
})
export class PatrocinadorService {

  private UrlApi = environment.API
  constructor(private http:HttpClient) { }

  listarPatrocinador():Observable<Patrocinador[]>{
    return this.http.get<Patrocinador[]>(`${this.UrlApi}/api/patrocinador`, httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  criarPatrocinador(patrocinador:Patrocinador): Observable<any>{
    return this.http.post(`${this.UrlApi}/api/patrocinador`, patrocinador, httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  apagarPatrocinador(id:number){
      return this.http.delete(`${this.UrlApi}/api/patrocinador/` + id, httpOptions)
      .pipe(
          catchError(this.errorHandler)
      )
    }


    buscarPatrocinador(id:number): Observable<any>{
      return this.http.get(`${this.UrlApi}/api/patrocinador/` + id, httpOptions)
      .pipe(
          catchError(this.errorHandler)
      )
    }


    atualizarPatrocinador(id:number,patrocinador:Patrocinador): Observable<any>{
      return this.http.put(`${this.UrlApi}/api/patrocinador/`+ id, patrocinador, httpOptions)
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
