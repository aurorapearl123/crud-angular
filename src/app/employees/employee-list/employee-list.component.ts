import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  ElementRef,
  Input,
  EventEmitter,
  Output
} from "@angular/core";
import { EmployeeService } from "src/app/shared/employee.service";
import { Employee } from "src/app/shared/employee.model";
import { DecimalPipe } from "@angular/common";
import { Observable } from "rxjs";

import * as jsPDF from "jspdf";
import "jspdf-autotable";
import { Router } from "@angular/router";
import { routerNgProbeToken } from "@angular/router/src/router_module";
import { UsersService } from "src/app/shared/users.service";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit {
  //@ViewChildren("content") content: ElementRef;
  //get the parent data
  //@Input() public parentData;
  //add alias
  @Input("parentData") public name;
  //send data to parent use eventEmitter
  @Output() public childEvent = new EventEmitter();
  page = 4;
  //to get the service import it to contructor
  //this is a list for mudule

  mapToSearch = {
    add: "",
    edit: "",
    view: "",
    delete: ""
  };

  list: object[];
  constructor(
    private service: EmployeeService,
    private router: Router,
    private userService: UsersService
  ) {}

  //now in thise nghooks call the get all patients in service
  ngOnInit() {
    this.service.getPatients();

    const userID = localStorage.getItem("userID");

    this.userService.getUserRole(userID).subscribe(response => {
      const roleName = response["data"][0].roleName;
      if (roleName.indexOf("patient") > -1) {
        const role = roleName.replace("patient", "");
        var list_roles = JSON.parse(role);

        for (var k in list_roles) {
          if (list_roles[k] == "1") {
            this.mapToSearch.add = "1";
          } else if (list_roles[k] == "2") {
            this.mapToSearch.edit = "2";
          } else if (list_roles[k] == "3") {
            this.mapToSearch.view = "3";
          } else if (list_roles[k] == "4") {
            this.mapToSearch.delete = "4";
          }
        }
        //this.mapToSearch.edit = this.list[0] + "";
        // this.mapToSearch.delete = this.list[1] + "";
      }
    });
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

  onSend() {
    this.childEvent.emit("Hey Tarzan");
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["signin"]);
  }
}
