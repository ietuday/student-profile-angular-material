import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { UsersComponent } from './users/users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/services';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const routes: Routes = [
    { path: '', component: UserProfileComponent },    
    { path: 'login', component: LoginComponent },
    { path: 'users-list', component: UsersComponent,},
    { path: 'create', component: EditUserComponent,},
    { path: 'create/:id/edit', component: EditUserComponent, pathMatch: 'full'},

        // otherwise redirect to home
    { path: '**', redirectTo: 'login' }

    
    
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
    