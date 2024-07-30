import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './app.constants';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EventManagmentComponent } from './pages/event-managment/event-managment.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';


const routes: Routes = [
  {path: AppRoutes.LOGIN, component: LoginComponent},
  {path: AppRoutes.DASHBOARD, component: DashboardComponent},
  {path: AppRoutes.EVENTS, component: EventManagmentComponent},
  {path: AppRoutes.EVENT, component: EventDetailsComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
