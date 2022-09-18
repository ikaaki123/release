import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PackageItemService } from '../services/package-item/package-item.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: PackageItemService, public RT: Router) { }
  
  canActivate(): boolean{
    if(this.service.checkLogin()){
      return true
    }else {
      this.RT.navigate(['/login']);
      return false
    }
  }
  
}
