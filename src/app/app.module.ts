import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';



import { TokenInterceptorService } from './home/login/token-interceptor.service';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt)

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    NgxMaskModule.forRoot(maskConfigFunction),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  },
  { provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
