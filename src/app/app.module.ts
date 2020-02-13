import {InjectionToken, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule, NbContextMenuModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule, NbSearchModule, NbSelectModule,
  NbSidebarModule,
  NbSidebarService,
  NbThemeModule, NbToastrModule, NbToastrService, NbUserModule
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {HttpClientModule} from '@angular/common/http';
import {NbAuthModule, NbPasswordAuthStrategy, NbTokenService} from '@nebular/auth';
import {RouterModule} from '@angular/router';
import {HomeModule} from './home/home.module';
import {HomeComponent} from './home/home.component';
import {FilePickerModule} from 'ngx-awesome-uploader';
import {NgxEchartsModule} from 'ngx-echarts';
import {BrowserModule} from '@angular/platform-browser';
import {DEFAULT_THEME} from './styles/theme.default';
import {DARK_THEME} from './styles/theme.dark';
import {CORPORATE_THEME} from './styles/theme.corporate';
import {COSMIC_THEME} from './styles/theme.cosmic';
import { NgxPayPalModule } from 'ngx-paypal';

@NgModule({
  entryComponents: [HomeComponent],
  declarations: [
    AppComponent
  ],
  imports: [
    HomeModule,
    AppRoutingModule,
    HttpClientModule,
    FilePickerModule,
    BrowserModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'default'}, [DEFAULT_THEME, DARK_THEME, CORPORATE_THEME, COSMIC_THEME]),
    NgxPayPalModule,
    NbLayoutModule,
    NbEvaIconsModule,
    RouterModule, // RouterModule.forRoot(routes, { useHash: true }), if this is your app.module
    NbLayoutModule,
    NbSidebarModule.forRoot(), // NbSidebarModule.forRoot(), //if this is your app.module
    NbMenuModule.forRoot(),
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbSelectModule,
    NbActionsModule,
    NbSearchModule,
    NbUserModule,
    NbToastrModule.forRoot(),
    NbContextMenuModule,
    NgxEchartsModule,
  ],
  providers: [
    NbSidebarService,
    NbTokenService,
    NbToastrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
