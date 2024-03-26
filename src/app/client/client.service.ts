import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse, HttpParamsOptions } from '@angular/common/http';
import { Client } from './model/Client';
import { DialogErrorComponent } from '../core/dialog-error/dialog-error.component';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http : HttpClient,
    public dialog : MatDialog) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>('http://localhost:8080/client');
  }

  saveClient(client: Client): Observable<Client> {
    let url = 'http://localhost:8080/client';
    if (client.id != null) url += '/' + client.id;

    return this.http.put<Client>(url, client)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 409) {
            const dialogRef = this.dialog.open(DialogErrorComponent, {
              data: { title: "Error al crear", description: "Ya existe un cliente con el mismo nombre." }
            });
          }
          return throwError(() => new Error('Error'));
        })
      );
  }


deleteClient(idClient : number): Observable<any> {
    return this.http.delete('http://localhost:8080/client/'+idClient);
}  
}
