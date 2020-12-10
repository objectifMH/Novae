import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InOutService } from './services/in-out.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isAuthenticated: boolean;

  constructor(private inout: InOutService, private router: Router){
    this.getAuthenticated();
  }

  
  getAuthenticated() {
    this.inout.getIsAuthenticated().subscribe(
      success=> {
        this.isAuthenticated = success;
        console.log(success);
      },
      error=> {
        console.log(error);
      }
    )
  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if ( this.isAuthenticated) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
  
}
