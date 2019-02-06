import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CommunicatorService } from './communicator.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BLockPassGuardFlatService implements CanActivate {
  constructor(private r:Router, private dataservice: CommunicatorService){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
   if(this.dataservice.data !== null) {
     return true
   }else{
    this.r.navigate([''])
   }

   return false;

  }
}