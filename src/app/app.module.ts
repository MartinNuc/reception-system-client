import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {ThankYouPageComponent} from './components/thanks-page/thank-you-page.component';
import {ReceptionPageComponent} from './components/reception-page/reception-page.component';
import {LicenceService} from './services/licence.service';
import {CompanyService} from './services/company.service';
import {VisitService} from './services/visit.service';
import {ConfigurationService} from './services/configuration.service';
import {Ng2AutoCompleteModule} from 'ng2-auto-complete';
import {AdminPageComponent} from './components/admin-page/admin-page.component';
import {DatePicker} from 'ng2-datepicker/ng2-datepicker';

@NgModule({
  declarations: [
    AppComponent,
    ThankYouPageComponent,
    ReceptionPageComponent,
    AdminPageComponent,
    DatePicker
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path: 'thank-you', component: ThankYouPageComponent},
      {path: 'admin', component: AdminPageComponent},
      {path: '', component: ReceptionPageComponent},
      {path: '**', component: ReceptionPageComponent}
    ]),
    Ng2AutoCompleteModule
  ],
  providers: [
    CompanyService,
    LicenceService,
    VisitService,
    ConfigurationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
