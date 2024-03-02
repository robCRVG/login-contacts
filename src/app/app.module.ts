import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './modules/home/home.component';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { ContactHomeComponent } from './modules/contact/page/contact-home/contact-home.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, ContactHomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
  ],
  providers: [CookieService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
