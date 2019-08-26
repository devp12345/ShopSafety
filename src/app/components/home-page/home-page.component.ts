import { Component, OnInit, AfterViewInit } from '@angular/core';
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

  signIn(){
    this.fbService.signInWithGoogle();
  }
  signOut(){
    this.fbService.signOut();
  }


}
