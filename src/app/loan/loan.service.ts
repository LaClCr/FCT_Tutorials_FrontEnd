import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { Loan } from './model/Loan';
import { Game } from '../game/model/Game';
import { Client } from '../client/model/Client';
import { LoanPage } from './model/LoanPage';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogErrorComponent } from '../core/dialog-error/dialog-error.component';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(
    private http : HttpClient,
    public dialog : MatDialog
  ) { }

  getLoans(pageable: Pageable, game?: Game, client?: Client, date?: string): Observable<LoanPage> {

    return this.http.post<LoanPage>('http://localhost:8080/loan', {
      pageable: pageable, game: game,
      client: client, date: date
    });
  }

  saveLoan(loan: Loan): Observable<Loan> {
    const url = 'http://localhost:8080/loan';

    return this.http.put<Loan>(url, loan, { observe: 'response' })
    .pipe(
      map((response: HttpResponse<Loan>) => response.body), 
      catchError((error: HttpErrorResponse) => {
        const errorBody = error.error instanceof ErrorEvent ? error.error.message : error.error; 
        const dialogRef = this.dialog.open(DialogErrorComponent, {
          data: { title: 'Error al crear', description: errorBody }
        });
        return throwError(() => new Error(errorBody));
      })
    );
  }
  deleteLoan(loanId: number): Observable<void> {
    return this.http.delete<void>('http://localhost:8080/loan/' + loanId);
  }
}