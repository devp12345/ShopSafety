import { Component, OnInit } from '@angular/core';
import { FirebaseService} from '../../providers/firebase.service'


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(public fbService: FirebaseService) { }

  ngOnInit() {
  }

  //add a prompt for if you cant sign in due to restrictions in the firebase.ts file 
  signIn(){
    this.fbService.signInWithGoogle();
  }
  signOut(){
    this.fbService.signOut();
  }

}
