import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
})
export class PdfViewerComponent {

  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss();
  }
}
