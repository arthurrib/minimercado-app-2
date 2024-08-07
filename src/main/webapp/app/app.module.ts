import {LOCALE_ID, NgModule} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import locale from '@angular/common/locales/en';
import {BrowserModule, Title} from '@angular/platform-browser';
import {ServiceWorkerModule} from '@angular/service-worker';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {NgxWebstorageModule} from 'ngx-webstorage';
import dayjs from 'dayjs/esm';
import {NgbDateAdapter, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';

import {ApplicationConfigService} from 'app/core/config/application-config.service';
import './config/dayjs';
import {SharedModule} from 'app/shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {HomeModule} from './home/home.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import {NgbDateDayjsAdapter} from './config/datepicker-adapter';
import {fontAwesomeIcons} from './config/font-awesome-icons';
import {httpInterceptorProviders} from 'app/core/interceptor/index';
import {MainComponent} from './layouts/main/main.component';
import {NavbarComponent} from './layouts/navbar/navbar.component';
import {FooterComponent} from './layouts/footer/footer.component';
import {PageRibbonComponent} from './layouts/profiles/page-ribbon.component';
import {ErrorComponent} from './layouts/error/error.component';
import {CurrencyMaskConfig, NgxCurrencyModule} from 'ngx-currency';
import {fas} from '@fortawesome/free-solid-svg-icons';
// import { far } from '@fortawesome/free-regular-svg-icons';

const customCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'right',
  allowNegative: false,
  allowZero: true,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
  nullable: true,
};

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    HomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    AppRoutingModule,
    // Set this to true to enable service worker (PWA)
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: false}),
    HttpClientModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    NgxWebstorageModule.forRoot({prefix: 'jhi', separator: '-', caseSensitive: true}),
  ],
  providers: [
    Title,
    {provide: LOCALE_ID, useValue: 'en'},
    {provide: NgbDateAdapter, useClass: NgbDateDayjsAdapter},
    httpInterceptorProviders,
  ],
  declarations: [
    MainComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    FooterComponent
  ],
  bootstrap: [MainComponent],
})
export class AppModule {
  constructor(applicationConfigService: ApplicationConfigService, iconLibrary: FaIconLibrary, dpConfig: NgbDatepickerConfig) {
    applicationConfigService.setEndpointPrefix(SERVER_API_URL);
    registerLocaleData(locale);
    iconLibrary.addIcons(...fontAwesomeIcons);
    iconLibrary.addIconPacks(fas);
    dpConfig.minDate = {year: dayjs().subtract(100, 'year').year(), month: 1, day: 1};
  }
}
