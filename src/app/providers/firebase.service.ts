import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { Observable } from 'rxjs'
import * as firebase from 'firebase/app'
import { User } from '../models/user'
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { switchMap, first } from 'rxjs/operators'
import { of } from "rxjs";
import { Router } from '@angular/router'


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  user$: Observable<User>;
  user: User;


  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore,  public router: Router) {
    this.user$ = this.afAuth.authState.pipe(switchMap(user => {
      if(user) {
        if ((user.email.endsWith("pdsb.net") && user.email.toLowerCase().startsWith("p")) || (user.email == "rushigandhi25@gmail.com")|| (user.email == "dpancea@gmail.com")){
          return this.afs.doc<User>(`teachers/${user.uid}`).valueChanges();
        }
        else if ((user.email == " rgandhi848@gmail.com") || (!isNaN(parseInt(user.email.charAt(0)))  && user.email.endsWith("pdsb.net"))){
          return this.afs.doc<User>(`students/${user.uid}`).valueChanges();
        }
       
      }
      else {
        return of(null);
      }
    }));
  }

  signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then((credential) => {
      if ((credential.user.email.endsWith("pdsb.net") && credential.user.email.toLowerCase().startsWith("p")) || (credential.user.email == "rushigandhi25@gmail.com")|| (credential.user.email == "dpancea@gmail.com")) {
        this.createTeacher(credential.user);
      }
      else if((credential.user.email == " rgandhi848@gmail.com") || ( !isNaN(parseInt(credential.user.email.charAt(0))) && credential.user.email.endsWith("pdsb.net"))) {
        this.createStudent(credential.user);
      }
    });
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  createStudent(user) {
    this.afs.doc(`students/${user.uid}`).ref.get().then((documentSnapshot) => {
      if(documentSnapshot.exists) {
        this.router.navigate(['/student']);
      }
      else {
        const studentRef: AngularFirestoreDocument<any> = this.afs.doc(`students/${user.uid}`);
        var fullName = user.displayName.substring(0, user.displayName.indexOf('-') - 1);
        var school = user.displayName.substring(user.displayName.indexOf('-') + 2);
        var userNumber = user.email.substring(0, user.email.indexOf('@'));
        const data: User = {
          id: user.uid,
          email: user.email,
          photoURL: user.photoURL,
          fullName: fullName,
          displayName: user.displayName,
          userNumber: userNumber,
          school: school,
          inClassTraining: [false, false, false, false, false, false, false, false, false, false],
          onlineTraining: [false, false, false, false, false, false, false, false, false, false],
          tests: [false, false, false, false, false, false, false, false, false, false],
          isStudent: true
        }
        this.router.navigate(['/student']);
        return studentRef.set(data, {merge: true});
      }
    });
}

  createTeacher(user) {
    this.afs.doc(`teachers/${user.uid}`).ref.get().then((documentSnapshot) => {
      if(documentSnapshot.exists) {
        this.router.navigate(['/teacher']);
      }
      else {
        const teacherRef: AngularFirestoreDocument<any> = this.afs.doc(`teachers/${user.uid}`);
        const data: User = {
          id: user.uid,
          email: user.email,
          photoURL: user.photoURL,
          displayName: user.displayName,
          school: user.displayName,
          isStudent: false
        }
        this.router.navigate(['/teacher']);
        return teacherRef.set(data, {merge: true});
      }
    });
  }


}
