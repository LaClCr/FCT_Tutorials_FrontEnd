import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoanService } from '../loan.service';
import { Loan } from '../model/Loan';
import { Client } from 'src/app/client/model/Client';
import { ClientService } from 'src/app/client/client.service';
import { Game } from 'src/app/game/model/Game';
import { GameService } from 'src/app/game/game.service';

@Component({
  selector: 'app-loan-edit',
  templateUrl: './loan-edit.component.html',
  styleUrls: ['./loan-edit.component.scss']
})
export class LoanEditComponent implements OnInit {

  loan: Loan;
  games: Game[];
  clients: Client[];

  constructor(
    public dialogRef: MatDialogRef<LoanEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loanService: LoanService,
    private gameService: GameService,
    private clientService: ClientService,
  ) { }

  ngOnInit(): void {

    this.loan = new Loan();

    this.clientService.getClients().subscribe(
      clients => {
        this.clients = clients;
      }
    );
    this.gameService.getGames().subscribe(
      games => {
        this.games = games;
      }
    );
  }

  onSave() {
    const initISOString = new Date(this.loan.ffinitDate.getTime() + 1 * 60 * 60 * 1000).toISOString();
    this.loan.initDate = initISOString.split('T')[0];

    const endISOString = new Date(this.loan.ffendDate.getTime() + 1 * 60 * 60 * 1000).toISOString();
    this.loan.endDate = endISOString.split('T')[0];

    this.loanService.saveLoan(this.loan).subscribe(result => {
      this.dialogRef.close();
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}