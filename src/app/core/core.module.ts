import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogErrorComponent } from './dialog-error/dialog-error.component';

@NgModule({
  declarations: [HeaderComponent, DialogConfirmationComponent, DialogErrorComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [
    {
      provide: MAT_DIALOG_DATA,
      useValue: {},
    },
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }