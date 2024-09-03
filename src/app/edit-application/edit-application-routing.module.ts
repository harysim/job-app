import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditApplicationPage } from './edit-application.page';

const routes: Routes = [
  {
    path: '',
    component: EditApplicationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditApplicationPageRoutingModule {}
