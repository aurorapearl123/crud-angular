import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  ElementRef
} from "@angular/core";
import { EmployeeService } from "src/app/shared/employee.service";
import { Employee } from "src/app/shared/employee.model";
import { DecimalPipe } from "@angular/common";
import { Observable } from "rxjs";

import * as jsPDF from "jspdf";
import "jspdf-autotable";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit {
  //@ViewChildren("content") content: ElementRef;
  page = 4;
  //to get the service import it to contructor
  constructor(private service: EmployeeService) {}

  //now in thise nghooks call the get all patients in service
  ngOnInit() {
    this.service.getPatients();
  }

  //update the employee click event
  updatePatient(patient: Employee) {
    console.log("you click me there");
    //call the form varialble inside the service
    //to change not realtime change
    //this.service.formData = patient;
    this.service.formData = Object.assign({}, patient);
    this.service.model.editorData = patient.comment;
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

  toPDf() {
    var columns = ["Firstname", "Middlename", "Lastname"];
    let patientList = this.service.list;
    const _data = [];
    for (var i = 0; i < patientList.length; i++) {
      _data.push([
        patientList[i].firstName,
        patientList[i].middleName,
        patientList[i].lastName
      ]);
    }

    let doc = new jsPDF();
    doc.autoTable({
      head: [columns],
      body: _data
    });

    doc.text(5, 5, "List of all patients.");
    // Save the PDF
    doc.save("Patient.pdf");
  }
}
