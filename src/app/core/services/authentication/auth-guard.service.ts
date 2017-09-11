import { Injectable, Optional, SkipSelf } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute
} from '@angular/router';
import { Observable } from 'rxjs/Rx';

// import { ToastService } from './toast/toast.service';
// import { UserProfileService } from './user-profile.service';
import { AuthService, } from './auth.service';
import { RolesService } from './../authorization/roles.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  deniedMessage = 'Unauthorized access denied';

  constructor(
    @Optional() @SkipSelf() prior: AuthGuard,
    private authService: AuthService,
    private roleService: RolesService,
    private router: Router,
    private route: ActivatedRoute) {
    if (prior) { return prior; }
  }


  canLoad(route: Route) {
    const url = `/${route.path}`;
    if (this.authService.isLoggedIn()) {
      let userRole;
      const user = this.authService.loggedInUser().subscribe(userr => {
        userRole = userr.role.name;
      });
      return true;
    }
    console.log('canLoadUrl' + url);
    this.router.navigate(['/login'], { queryParams: { redirectTo: url } });
    // this.toastService.activate(this.deniedMessage);
    return this.authService.isLoggedIn();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    if (this.authService.isLoggedIn()) {

      return this.authService.loggedInUser()
        .map(response => {
          if (!response) { return; }

          const hasPermission = this.roleService.hasPermission(response.user.role.name, next.data['routeName']);
          if (!hasPermission) {
            this.router.navigate(['/login']);
          }

          return hasPermission;
        });
    }

    this.router.navigate(['/login'], { queryParams: { redirectTo: state.url } });
    // this.toastService.activate(this.deniedMessage);
    return false;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.canActivate(route, state);
  }
}
