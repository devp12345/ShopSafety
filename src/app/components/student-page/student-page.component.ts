import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../providers/firebase.service';
import {Router} from '@angular/router'
import { User } from '../../models/user'
import { MachineService } from 'src/app/machines.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent implements OnInit {

  student: User;
  machineList: any[]
  subscription: Subscription;
  constructor(public fbService: FirebaseService, public router: Router, private machineService: MachineService) { }
  
  ngOnInit() {
    this.subscription = this.machineService.machinesChanged.subscribe(
      (machines: any[]) => {
            this.machineList = machines
          }
        
      );
      this.machineList = this.machineService.getMachines();
    this.fbService.user$.subscribe(user => this.student = user);
  }

  signOut(){
    this.fbService.signOut();
    this.router.navigate(['/']);
  }

  onCheck(){
    console.log(this.machineService.getMachines())
  }

}
