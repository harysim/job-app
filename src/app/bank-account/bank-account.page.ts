import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PdfViewerComponent } from '../pdf-viewer/pdf-viewer.component';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.page.html',
})
export class BankAccountPage {

  constructor(private modalController: ModalController) {}

  async openPdf() {
    const modal = await this.modalController.create({
      component: PdfViewerComponent
    });
    return await modal.present();
  }
}
