import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule }  from "@angular/forms"
import { environment } from '../environments/environment';


// AngularFire2
import { AngularFireModule } from 'angularfire2'
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore'
import { HomePageComponent } from './components/home-page/home-page.component';
import { TeacherPageComponent } from './components/teacher-page/teacher-page.component';
import { StudentPageComponent } from './components/student-page/student-page.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseService } from './providers/firebase.service';
import { RoutingModule } from './routing.module';
import { StudentGuard } from './guards/student.guard';
import { TeacherGuard } from './guards/teacher.guard';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    TeacherPageComponent,
    StudentPageComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    RoutingModule,
    FormsModule
  ],
  providers: [FirebaseService, StudentGuard, TeacherGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
