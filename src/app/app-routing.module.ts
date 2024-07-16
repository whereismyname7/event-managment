import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './app.constants';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StackedBarComponent } from './components/charts/stacked-bar/stacked-bar.component';

const routes: Routes = [
  {path: AppRoutes.LOGIN, component: LoginComponent},
  {path: AppRoutes.DASHBOARD, component: DashboardComponent},

  //remove
  {path: "stacked-bar", component: StackedBarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
