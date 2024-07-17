import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './app.constants';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { StackedBarComponent } from './components/charts/stacked-bar/stacked-bar.component';
import { GroupedBarComponent } from './components/charts/grouped-bar/grouped-bar.component';
import { AdvancedPieComponent } from './components/charts/advanced-pie/advanced-pie.component';

const routes: Routes = [
  {path: AppRoutes.LOGIN, component: LoginComponent},
  {path: AppRoutes.DASHBOARD, component: DashboardComponent},

  //remove
  {path: "stacked-bar", component: StackedBarComponent},
  {path: "grouped-bar", component: GroupedBarComponent},
  {path: "advanced-pie", component: AdvancedPieComponent}
  //
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
