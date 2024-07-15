import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { PieGridComponent } from './components/charts/pie-grid/pie-grid.component';
import { AdvancedPieComponent } from './components/charts/advanced-pie/advanced-pie.component';
import { StackedBarComponent } from './components/charts/stacked-bar/stacked-bar.component';
import { GroupedBarComponent } from './components/charts/grouped-bar/grouped-bar.component';
import { ButtonComponent } from './components/layouts/button/button.component';
import { BreadcrumbsComponent } from './components/layouts/breadcrumbs/breadcrumbs.component';
import { MessageComponent } from './components/layouts/message/message.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    PieGridComponent,
    AdvancedPieComponent,
    StackedBarComponent,
    GroupedBarComponent,
    ButtonComponent,
    BreadcrumbsComponent,
    MessageComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
