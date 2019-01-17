import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../providers/firebase.service';
import {Router} from '@angular/router'
import { User } from '../../models/user'

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent implements OnInit {

  student: User;
  machineList = ["Drill Press","Horizontal Bandsaw", "Vertical Bandsaw", "Lathe", "Surface Grinder", "Bench Grinder", "Milling Machine", "CNC Router", "Laser Cutter", "Hand Tools"]

  constructor(public fbService: FirebaseService, public router: Router) { }
  
  ngOnInit() {
    this.fbService.user$.subscribe(user => this.student = user);
  }

  signOut(){
    this.fbService.signOut();
    this.router.navigate(['/']);
  }

}
