import { Component, OnInit } from "@angular/core";
import { MachineService } from "src/app/machines.service";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
selector:'new-machine',
templateUrl: 'new-machine.component.html',
styleUrls: ['./new-machine.component.css']

}) 
export class NewMachine implements OnInit{

constructor(private machineService: MachineService, private router: Router,
    private route: ActivatedRoute){}
subscription: Subscription
machineList: any[];


ngOnInit(){
    this.subscription = this.machineService.machinesChanged.subscribe(
        (machines: any[]) => {
              this.machineList = machines
            }
          
        );
        this.machineList = this.machineService.getMachines()
}

onSubmit(form: NgForm){
const name = form.value.machineName
this.machineService.addmachine(name);
console.log(name)
console.log(this.machineService.getMachines())
form.reset()
}

onReturn(){
    this.router.navigate(['teacher'])
}


onDelete(i: number){
this.machineService.removeMachine(i)
}

}