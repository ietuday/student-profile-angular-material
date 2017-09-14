import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs/Subject';

interface Permission {
    name: string;
    title: string;
    url: string;
    avatar: string;
}

@Injectable()
export class RolesService {

    private roles = {
        'admin': [
            // { name: 'create-requisition', title: 'Create Requisition', url: '/insurance/create-requisition', avatar: 'local_hospital' },
            // { name: 'dashboard', title: 'Dashboard', url: '/dashboard', avatar: 'dashboard' },
            { name: 'users-list', title: 'Users-List', url: '/users-list', avatar: 'person' },
            { name: 'users-create', title: 'create', url: '/create', avatar: 'settings' },
            { name: 'users-create-id', title: 'users-create-id', url: '/create/:id', avatar: 'verified_user' },
            // { name: 'requisitions', title: 'Requisitions', url: '/requisitions', avatar: 'chrome_reader_mode' },
            // { name: 'pending-tasks', title: 'Pending Tasks', url: '/pending-tasks', avatar: 'list' },
        ],
    };

    getPermissions(role: string): Array<Permission> {
        const selectedRole = this.roles[role];
        if (!selectedRole) {
            throw Error('Role with `${role}` name not found');
        }
        console.log("Inside getPermissions",selectedRole);
        return selectedRole;
    }

    hasPermission(role: string, permission: string): boolean {
        const permissions = this.getPermissions(role);
        return permissions.filter(permissionFilter => permissionFilter.name === permission).length > 0;
    }

    getDefaultRoute(role: string): string {
        return this.getPermissions(role)[0].url;
    }
}
