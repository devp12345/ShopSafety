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
  videoList = [
    "https://www.youtube.com/watch?v=Y6SIlBqImnA", 
    "https://www.youtube.com/watch?v=zrLNVJ3tbtA", 
    "https://www.youtube.com/watch?v=10l-niZBmr0", 
    "https://www.youtube.com/watch?v=DpyWXqJAQLY", 
    "https://www.youtube.com/watch?v=7FwL55ErfDI", 
    "https://www.youtube.com/watch?v=GB-Pa73Snp4", 
    "https://www.youtube.com/watch?v=ip2jm_6aUyk", 
    "https://www.youtube.com/watch?v=_PfoMhFJXfk",
    "https://www.youtube.com/watch?v=WbYeNyBV8MM", 
    "https://www.youtube.com/watch?v=wid-SXfbv68"];
  
    


  constructor(public fbService: FirebaseService, public router: Router) { }
  
  ngOnInit() {
    this.fbService.user$.subscribe(user => this.student = user);
  }

  signOut(){
    this.fbService.signOut();
    this.router.navigate(['/']);
  }

}
