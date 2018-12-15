import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleguardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> {
      console.log("wuj", this.authService);
    return this.authService.userRole$.pipe(map(s => {
      console.log("asd");
      if (!s) {
        this.router.navigate(['admin/login']);
        return false;
      } else if (s.role === 'admin') { return true; } else if (s.role === 'worker') {
        this.router.navigate(['admin/']);
        return false;
      }
    }));
  }
}
