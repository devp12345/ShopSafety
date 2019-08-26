import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { StudentPageComponent } from './components/student-page/student-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { TeacherPageComponent } from './components/teacher-page/teacher-page.component';
import { StudentGuard } from './guards/student.guard';
import { TeacherGuard } from './guards/teacher.guard';
import { NewMachine } from './components/teacher-page/new-machine/new-machine.component';

const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'student', component: StudentPageComponent, canActivate: [StudentGuard]},
    {path: 'teacher', component: TeacherPageComponent, canActivate: [TeacherGuard]},
    {path: 'add', component: NewMachine}
]

@NgModule ({
    imports:[RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})

export class RoutingModule {}