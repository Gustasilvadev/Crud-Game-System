import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Inscricao } from '../interfaces/inscricao';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class InscricaoService {

  private UrlApi = environment.API
  constructor(private http:HttpClient) { }

  listarIncricao():Observable<Inscricao[]>{
    return this.http.get<Inscricao[]>(`${this.UrlApi}/api/inscricao`, httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  criarInscricao(inscricao:Inscricao): Observable<any>{
    return this.http.post(`${this.UrlApi}/api/inscricao`, inscricao, httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  apagarInscricao(id:number){
      return this.http.delete(`${this.UrlApi}/api/inscricao/` + id, httpOptions)
      .pipe(
          catchError(this.errorHandler)
      )
    }


    buscarInscricao(id:number): Observable<any>{
      return this.http.get(`${this.UrlApi}/api/inscricao/` + id, httpOptions)
      .pipe(
          catchError(this.errorHandler)
      )
    }

    atualizarInscricao(id:number,inscricao:Inscricao): Observable<any>{
      return this.http.put(`${this.UrlApi}/api/inscricao/`+ id, inscricao, httpOptions)
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
