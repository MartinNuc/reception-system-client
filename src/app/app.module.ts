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

@NgModule({
  declarations: [
    AppComponent,
    ThankYouPageComponent,
    ReceptionPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path: 'thank-you', component: ThankYouPageComponent},
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
