import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-file-preview',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>معاينة الملف</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="close()">إغلاق</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <iframe *ngIf="previewUrl" [src]="previewUrl | safeUrl" width="100%" height="100%" style="border:none;"></iframe>
    </ion-content>
  `
})
export class FilePreviewComponent {
  @Input() previewUrl: string;

  constructor(private modalController: ModalController) {}

  close() {
    this.modalController.dismiss();
  }
}
