import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { UsersComponent,DeleteUserComponent } from './users/users.component';
import { AppRoutes } from './app.routes';
import { ApiService, ExceptionService, AuthService, AppStorage, LoadingService,AuthGuard, RolesService } from './core/services';
import { EndpointService } from './config';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LoginComponent } from './login/login.component';
import {MdIconModule} from '@angular/material';
// import { AuthGuard } from './core/services/authentication/auth.gaurds';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    DeleteUserComponent,
    EditUserComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutes,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MdIconModule
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
