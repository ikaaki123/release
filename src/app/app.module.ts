import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './shared/material/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PackageDelailsComponent } from './package-details/package-details.component';
import { PackageItemsComponent } from './package-items/package-items.component';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSelectModule } from 'ngx-select-ex';
import { DocumentComponent } from './document/document.component';
import { AddDocumentsComponent } from './document/add-documents/add-documents.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { NgSelectModule } from "@ng-select/ng-select";
import {MatSelectModule} from '@angular/material/select';
import  { SimpleNotificationsModule } from "angular2-notifications";
import { HttpInterceptorService } from './services/http-interceptor/http-interceptor.service';
import { AuthGuard } from './AuthGuard/auth.guard';
import { EditTableComponent } from './document/edit-table/edit-table.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { DrawbackComponent } from './drawback/drawback.component';
import { EditDrawbackComponent } from './document/edit-drawback/edit-drawback.component';
import { AddClientsComponent } from './package-items/add-clients/add-clients.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PackageDelailsComponent,
    PackageItemsComponent,
    DocumentComponent,
    AddDocumentsComponent,
    EditTableComponent,
    DrawbackComponent,
    EditDrawbackComponent,
    AddClientsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    NgxSelectModule,
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CommonModule,
    MatDialogModule,
    MatInputModule,
    NgSelectModule,
    MatSelectModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    SimpleNotificationsModule.forRoot(),


  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:HttpInterceptorService,multi:true}, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
