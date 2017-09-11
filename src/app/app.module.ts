import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { UsersComponent,DeleteUserComponent } from './users/users.component';
import { AppRoutes } from './app.routes';
import { ApiService, ExceptionService, AuthService, AppStorage, AuthGuard, LoadingService, RolesService } from './core/services';
import { EndpointService } from './config';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EditUserComponent } from './edit-user/edit-user.component';
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    DeleteUserComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutes,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [
    ApiService,
    ExceptionService,
    AuthService,
    RolesService,
    EndpointService,
    AppStorage,
    AuthGuard,
    LoadingService
  ],
  entryComponents: [
    DeleteUserComponent    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
