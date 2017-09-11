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
            { name: 'create-requisition', title: 'Create Requisition', url: '/insurance/create-requisition', avatar: 'local_hospital' },
            { name: 'dashboard', title: 'Dashboard', url: '/dashboard', avatar: 'dashboard' },
            { name: 'users', title: 'Users', url: '/users', avatar: 'person' },
            { name: 'configuration', title: 'Configuration', url: '/configuration', avatar: 'settings' },
            { name: 'insurance-check', title: 'Check Insurance', url: '/insurance/check', avatar: 'verified_user' },
            { name: 'requisitions', title: 'Requisitions', url: '/requisitions', avatar: 'chrome_reader_mode' },
            { name: 'pending-tasks', title: 'Pending Tasks', url: '/pending-tasks', avatar: 'list' },
        ],

        'physician': [
            { name: 'create-requisition', title: 'Create Requisition', url: '/insurance/create-requisition', avatar: 'local_hospital' },
            { name: 'dashboard', title: 'Dashboard', url: '/dashboard', avatar: 'dashboard' },
            { name: 'requisitions', title: 'Requisitions', url: '/requisitions', avatar: 'chrome_reader_mode' },
        ],

        'office_manager': [
            { name: 'create-requisition', title: 'Create Requisition', url: '/insurance/create-requisition', avatar: 'local_hospital' },
            { name: 'dashboard', title: 'Dashboard', url: '/dashboard', avatar: 'dashboard' },
            { name: 'insurance-check', title: 'Check Insurance', url: '/insurance/check', avatar: 'verified_user' },
        ],
        'phlebotomist': [
            { name: 'create-requisition', title: 'Create Requisition', url: '/insurance/create-requisition', avatar: 'local_hospital' },
            { name: 'dashboard', title: 'Dashboard', url: '/dashboard', avatar: 'dashboard' },
            { name: 'insurance-check', title: 'Check Insurance', url: '/insurance/check', avatar: 'verified_user' },
            { name: 'requisitions', title: 'Requisitions', url: '/requisitions', avatar: 'chrome_reader_mode' },
        ],
        'insurance_verification': [
            { name: 'insurance-check', title: 'Check Insurance', url: '/insurance/check', avatar: 'verified_user' }
        ]
    };

    getPermissions(role: string): Array<Permission> {
        const selectedRole = this.roles[role];
        if (!selectedRole) {
            throw Error('Role with `${role}` name not found');
        }

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
