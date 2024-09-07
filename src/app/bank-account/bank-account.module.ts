import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BankAccountPageRoutingModule } from './bank-account-routing.module';
import { BankAccountPage } from './bank-account.page';
import { PdfViewerComponent } from '../pdf-viewer/pdf-viewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer'; // Import PdfViewerModule

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BankAccountPageRoutingModule,
    PdfViewerModule // Add PdfViewerModule here
  ],
  declarations: [BankAccountPage, PdfViewerComponent],
})
export class BankAccountPageModule {}
