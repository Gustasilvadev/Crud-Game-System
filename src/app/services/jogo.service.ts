import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Jogo } from '../interfaces/jogo';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class JogoService {

  private UrlApi = environment.API
  constructor(private http:HttpClient) { }

  listarJogo():Observable<Jogo[]>{
    return this.http.get<Jogo[]>(`${this.UrlApi}/api/jogo`, httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  criarJogo(jogo:Jogo): Observable<any>{
    return this.http.post(`${this.UrlApi}/api/jogo`, jogo, httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  apagarJogo(id:number){
      return this.http.delete(`${this.UrlApi}/api/jogo/` + id, httpOptions)
      .pipe(
          catchError(this.errorHandler)
      )
    }


    buscarJogo(id:number): Observable<any>{
      return this.http.get(`${this.UrlApi}/api/jogo/` + id, httpOptions)
      .pipe(
          catchError(this.errorHandler)
      )
    }


    atualizarJogo(id:number,jogo:Jogo): Observable<any>{
      return this.http.put(`${this.UrlApi}/api/jogo/`+ id, jogo, httpOptions)
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
