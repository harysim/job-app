import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Include ReactiveFormsModule
import { IonicModule } from '@ionic/angular';

import { EditApplicationPageRoutingModule } from './edit-application-routing.module';
import { EditApplicationPage } from './edit-application.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  // Import ReactiveFormsModule
    IonicModule,
    EditApplicationPageRoutingModule
  ],
  declarations: [EditApplicationPage]
})
export class EditApplicationPageModule {}
