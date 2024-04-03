import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { Loan } from './model/Loan';
import { Game } from '../game/model/Game';
import { Client } from '../client/model/Client';
import { LoanPage } from './model/LoanPage';


@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(
    private http: HttpClient
  ) { }

  getLoans(pageable:Pageable,  game?: Game, client?:Client, date?: Date): Observable<LoanPage> {
    
    return this.http.post<LoanPage>('http://localhost:8080/loan', {pageable: pageable, game: game,
    client: client, date: date } );
  }

  saveLoan(loan: Loan): Observable<void> {
    let url = 'http://localhost:8080/loan';
    return this.http.put<void>(url, loan);
  }

  deleteLoan(loanId : number): Observable<void> {
      return this.http.delete<void>('http://localhost:8080/loan/'+loanId);
  }    
}