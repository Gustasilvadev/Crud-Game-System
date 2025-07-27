import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Participante } from '../interfaces/participante';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};


@Injectable({
  providedIn: 'root'
})
export class ParticipanteService {

  private UrlApi = environment.API
  constructor(private http:HttpClient) { }

  listarParticipante():Observable<Participante[]>{
    return this.http.get<Participante[]>(`${this.UrlApi}/api/participante`, httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  criarParticipante(participante:Participante): Observable<any>{
    return this.http.post(`${this.UrlApi}/api/participante`, participante, httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  apagarParticipante(id:number){
      return this.http.delete(`${this.UrlApi}/api/participante/` + id, httpOptions)
      .pipe(
          catchError(this.errorHandler)
      )
    }


    buscarParticipante(id:number): Observable<any>{
      return this.http.get(`${this.UrlApi}/api/participante/` + id, httpOptions)
      .pipe(
          catchError(this.errorHandler)
      )
    }


    atualizarParticipante(id:number,participante:Participante): Observable<any>{
      return this.http.put(`${this.UrlApi}/api/participante/`+ id, participante, httpOptions)
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
