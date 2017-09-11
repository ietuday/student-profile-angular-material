import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { UsersComponent } from './users/users.component';
import { EditUserComponent } from './edit-user/edit-user.component';


export const routes: Routes = [
    { path: '', component: UsersComponent },
    { path: 'users-list', component: UsersComponent },
    { path: 'create', component: EditUserComponent },
    { path: 'create/:id/edit', component: EditUserComponent, pathMatch: 'full' }
    
    
    
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
