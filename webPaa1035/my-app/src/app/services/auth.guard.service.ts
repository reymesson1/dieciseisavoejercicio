import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  ActivatedRouteSnapshot, 
  Router, 
  RouterStateSnapshot
} from '@angular/router';
import { RestSourceData } from 'src/app/model/rest.datasource';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private router: Router, private data: RestSourceData) {}

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot,
  ) {
        
    if (!this.data.isAuthenticated) {
      
      this.router.navigateByUrl('/login');
    }
    return true;
  }
}
