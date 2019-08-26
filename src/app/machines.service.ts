import { Subject } from "rxjs";



export class MachineService {
    machinesChanged = new Subject<any[]>(); 

   private machineList = ["Drill Press",
   "Horizontal Bandsaw",
    "Vertical Bandsaw", 
    "Lathe", 
    "Surface Grinder", 
    "Bench Grinder", 
    "Milling Machine",
     "CNC Router", 
     "Laser Cutter",
      "Hand Tools"]

      getMachines(){
          return this.machineList.slice();
      }

      addmachine(machine: string){
        this.machineList.push(machine);
        this.machinesChanged.next(this.machineList.slice());
      }

      removeMachine(index: number){
        this.machineList.splice(index, 1);
        this.machinesChanged.next(this.machineList.slice());
      }



}