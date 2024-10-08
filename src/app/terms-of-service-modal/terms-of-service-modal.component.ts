import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-terms-of-service-modal',
  templateUrl: './terms-of-service-modal.component.html',
  styleUrls: ['./terms-of-service-modal.component.scss'],
})
export class TermsOfServiceModalComponent {

  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss();
  }
}
