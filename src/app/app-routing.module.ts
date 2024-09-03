import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'form',
    pathMatch: 'full'
  },
  {
    path: 'form',
    loadChildren: () => import('./form/form.module').then(m => m.FormPageModule)
  },
  {
    path: 'terms-of-service',
    loadChildren: () => import('./terms-of-service/terms-of-service.module').then(m => m.TermsOfServicePageModule)
  },
  {
    path: 'admin-login',
    loadChildren: () => import('./admin-login/admin-login.module').then(m => m.AdminLoginPageModule)
  },
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardPageModule)
  },
  {
    path: 'edit-application/:id',  // Add ':id' to the path to capture the application ID
    loadChildren: () => import('./edit-application/edit-application.module').then(m => m.EditApplicationPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
