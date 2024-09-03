import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

// Import the TermsOfServiceModalComponent
import { TermsOfServiceModalComponent } from './terms-of-service-modal/terms-of-service-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    TermsOfServiceModalComponent, // Declare the modal component here
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), // You don't need to set the mode here; it will be handled dynamically
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // Import this for Angular animations support
    HttpClientModule,  // Add HttpClientModule here

    // Import Angular Material modules
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule, // Needed for Datepicker
    MatButtonModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
