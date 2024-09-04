import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'form',  // Default route redirecting to 'form'
    pathMatch: 'full'
  },
  {
    path: 'form',
    loadChildren: () => import('./form/form.module').then(m => m.FormPageModule)  // Lazy-loaded module for the 'form' route
  },
  {
    path: 'terms-of-service',
    loadChildren: () => import('./terms-of-service/terms-of-service.module').then(m => m.TermsOfServicePageModule)  // Lazy-loaded module for 'terms-of-service'
  },
  {
    path: 'admin-login',
    loadChildren: () => import('./admin-login/admin-login.module').then(m => m.AdminLoginPageModule)  // Lazy-loaded module for 'admin-login'
  },
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardPageModule)  // Lazy-loaded module for 'admin-dashboard'
  },
  {
    path: 'edit-application/:id',
    loadChildren: () => import('./edit-application/edit-application.module').then(m => m.EditApplicationPageModule)  // Lazy-loaded module for editing application, with parameter
  },
  {
    path: '**',
    redirectTo: 'form',  // Wildcard route to catch any undefined routes and redirect to 'form'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })  // Use preloading strategy for better performance
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
