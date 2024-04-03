import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Loan } from '../model/Loan';
import { Game } from 'src/app/game/model/Game';
import { Client } from 'src/app/client/model/Client';
import { LoanEditComponent } from '../loan-edit/loan-edit.component';
import { LoanService } from '../loan.service';
import { ClientService } from 'src/app/client/client.service';
import { MatDialog } from '@angular/material/dialog';
import { GameService } from 'src/app/game/game.service';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation.component';
import { Pageable } from 'src/app/core/model/page/Pageable';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent {

  loanList: Loan[];
  clientList: Client[];
  gameList: Game[];

  filterDate: Date;
  filterGame: Game;
  filterClient: Client;
  areFiltersOn: boolean = false;

  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  dataSource = new MatTableDataSource<Loan>();
  displayedColumns: string[] = ['id', 'game', 'client', 'initDate', 'endDate', 'action'];

  constructor(
    private loanService: LoanService,
    private gameService: GameService,
    private clientService: ClientService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(
      clientList => this.clientList = clientList
    );

    this.gameService.getGames().subscribe(
      gameList => this.gameList = gameList
    );

    this.loadPageWithoutFilters();
  }

  isPageFiltered(event?: PageEvent) {
    this.areFiltersOn ? this.loadFilteredPage(event) : this.loadPageWithoutFilters(event);
  }

  onCleanFilters(): void {
    this.filterDate = null;
    this.filterClient = null;
    this.filterGame = null;

    this.areFiltersOn = false;

    this.loadPageWithoutFilters();
  }

  onFindWithFilters(): void {

    this.areFiltersOn = true;

    let pageable: Pageable = {
      pageNumber: 0,
      pageSize: this.pageSize,
      sort: [{
        property: 'id',
        direction: 'ASC'
      }]
    }
    let date: Date = this.filterDate;
    if (date) {
      date = new Date(date.getTime() + 1 * 60 * 60 * 1000);
    }
    this.loanService.getLoans(pageable, this.filterGame, this.filterClient, date).subscribe(loans => {
      this.dataSource.data = loans.content;
      this.pageNumber = loans.pageable.pageNumber;
      this.pageSize = loans.pageable.pageSize;
      this.totalElements = loans.totalElements;
    });
  }
 

  loadFilteredPage(event?: PageEvent) {

    let date = this.filterDate;
    let client = this.filterClient;
    let game = this.filterGame;

    if (date) {
      date = new Date(date.getTime() + 1 * 60 * 60 * 1000);
    }

    let pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [{
        property: 'id',
        direction: 'ASC'
      }]
    }

    if (event != null) {
      pageable.pageSize = event.pageSize;
      pageable.pageNumber = event.pageIndex;
    }

    this.loanService.getLoans(pageable, this.filterGame, this.filterClient, date).subscribe(data => {
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    })

  }

  loadPageWithoutFilters(event?: PageEvent) {
      let pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [{
        property: 'id',
        direction: 'ASC'
      }]
    }
    if (event != null) {
      pageable.pageSize = event.pageSize;
      pageable.pageNumber = event.pageIndex;
    }
    this.loanService.getLoans(pageable).subscribe(data => {
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    })
  }

  createLoan() {
    const dialogRef = this.dialog.open(LoanEditComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  deleteLoan(loan: Loan) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: { title: "Eliminar préstamo", description: "Atención: al eliminar el préstamo, se perderán sus datos.<br> ¿Desea eliminar el préstamo?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loanService.deleteLoan(loan.id).subscribe(result => {
          this.ngOnInit();
        });
      }
    });
  }
}

