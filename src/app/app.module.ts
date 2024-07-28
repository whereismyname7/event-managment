import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { PieGridComponent } from './components/charts/pie-grid/pie-grid.component';
import { AdvancedPieComponent } from './components/charts/advanced-pie/advanced-pie.component';
import { StackedBarComponent } from './components/charts/stacked-bar/stacked-bar.component';
import { GroupedBarComponent } from './components/charts/grouped-bar/grouped-bar.component';
import { ButtonComponent } from './components/layouts/button/button.component';
import { BreadcrumbsComponent } from './components/layouts/breadcrumbs/breadcrumbs.component';
import { MessageComponent } from './components/layouts/message/message.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule, MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AddEventComponent } from './pages/add-event/add-event.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    DashboardComponent,
    AddEventComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxChartsModule,
    HttpClientModule, // Make sure HttpClientModule is imported
    TranslateModule.forRoot({
      defaultLanguage: 'ar',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    { provide: MAT_DATE_LOCALE, useValue: 'ar-US' }, // Use your locale

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
