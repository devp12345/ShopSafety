import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../providers/firebase.service'
import { tap, map, take } from 'rxjs/operators'
import { Router } from '@angular/router'
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {

  constructor(private firebaseService: FirebaseService, public router: Router,  private location: Location) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.firebaseService.user$.pipe(
      take(1),
      map(user => user && user.isStudent ? true : false),
      tap(isStudent => {
        if(!isStudent) {
          alert("ACCESS DENIED -  Students only");
          console.log("ACCESS DENIED -  Students only");
          this.location.back();
        }
      })
    );
  }
}
