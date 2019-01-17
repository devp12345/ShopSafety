import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../providers/firebase.service';
import {Router} from '@angular/router'
import { User } from '../../models/user'
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { combineLatest } from 'rxjs'
import { toast } from 'materialize-css';

@Component({
  selector: 'app-teacher-page',
  templateUrl: './teacher-page.component.html',
  styleUrls: ['./teacher-page.component.css']
})
export class TeacherPageComponent implements OnInit {

  teacher: User;
  startAt = new Subject();
  endAt = new Subject();
  startObservable = this.startAt.asObservable();
  endObservable = this.endAt.asObservable();

  constructor(public fbService: FirebaseService, public router: Router, public afs: AngularFirestore) { }
  
  searchTerm: string;
  students;
  editState: boolean = false;
  studentToEdit: User;
  machineList = ["Drill Press","Horizontal Bandsaw", "Vertical Bandsaw", "Lathe", "Surface Grinder", "Bench Grinder", "Milling Machine", "CNC Router", "Laser Cutter", "Hand Tools"]


  ngOnInit() {
    this.fbService.user$.subscribe(user => this.teacher = user);
    combineLatest(this.startObservable, this.endObservable).subscribe((value) => {
      this.fireQuery(value[0], value[1]).subscribe((students) => {
        this.students = students;
      })
    });
  }

  search($event) {
    let enteredText = $event.target.value;
    console.log(enteredText);
    this.startAt.next(enteredText);
    this.endAt.next(enteredText + '\uf8ff')

  }

  fireQuery(start, end) {
    return this.afs.collection('students', ref => ref.limit(4).orderBy('userNumber').startAt(start).endAt(end)).valueChanges();
  }

  signOut(){
    this.fbService.signOut();
    this.router.navigate(['/']);
  }

  editStudent(student: User){
    this.editState = true;
    this.studentToEdit = student;
    console.log(student.displayName);
  }

  clearState(){
    this.editState = false;
    this.studentToEdit = null;
  }

  updateStudent(student: User, typeOfTraining: number, i: number, state: boolean) {
    if (typeOfTraining == 0) {
      student.inClassTraining[i] = state;
      this.afs.doc(`students/${student.id}`).update(student);
      if (state) {
        let toastMessage = "You updated " + this.machineList[i] + " training to COMPLETE!"
        toast(toastMessage, 2500);
      }
      else {
        let toastMessage = "You updated " + this.machineList[i] + " training to INCOMPLETE!"
        toast(toastMessage, 2500);
      }
    }
    else if (typeOfTraining == 1) {
      student.onlineTraining[i] = state;
      this.afs.doc(`students/${student.id}`).update(student);

      if (state) {
        let toastMessage = "You updated " + this.machineList[i] + " video to COMPLETE!"
        toast(toastMessage, 2500);
      }
      else {
        let toastMessage = "You updated " + this.machineList[i] + " video to INCOMPLETE!"
        toast(toastMessage, 2500);
      }
    }
    else if (typeOfTraining == 2) {
      student.tests[i] = state;
      this.afs.doc(`students/${student.id}`).update(student);

      if (state) {
        let toastMessage = "You updated " + this.machineList[i] + " test to COMPLETE!"
        toast(toastMessage, 2500);
      }
      else {
        let toastMessage = "You updated " + this.machineList[i] + " test to INCOMPLETE!"
        toast(toastMessage, 2500);
      }
    }
  }
}
