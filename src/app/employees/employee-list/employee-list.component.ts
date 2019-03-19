import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "src/app/shared/employee.service";
import { Employee } from "src/app/shared/employee.model";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit {
  //to get the service import it to contructor
  constructor(private service: EmployeeService) {}

  //now in thise nghooks call the get all patients in service
  ngOnInit() {
    this.service.getPatients();
  }

  //update the employee click event
  updatePatient(patient: Employee) {
    //call the form varialble inside the service
    //to change not realtime change
    //this.service.formData = patient;
    this.service.formData = Object.assign({}, patient);
  }

  onDelete(id: number) {
    if (confirm("Are you sure to delete this record?")) {
      this.service.deleteRecord(id).subscribe(response => {
        console.log(response);
        //call the get patients to refresh the data
        this.service.getPatients();
      });
    }
  }
}
