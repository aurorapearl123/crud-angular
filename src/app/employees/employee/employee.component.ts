import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "src/app/shared/employee.service";
import { NgForm } from "@angular/forms";
import { from } from "rxjs";
//import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"]
})
export class EmployeeComponent implements OnInit {
  //after import this emploueeservice make sure to add to appmodule to provider
  //then make a from ui
  //add the toastr service
  constructor(private service: EmployeeService) {}

  ngOnInit() {
    //next initialize form
    this.resetForm();
    //get all patients
  }

  //we need this function to our form
  //to set the form to nullable add ?
  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.service.formData = {
      patientID: null,
      firstName: "",
      middleName: "",
      lastName: ""
    };
  }

  //click event from html
  onSubmit(form: NgForm) {
    if (form.value.patientID == null) {
      this.insetRecord(form);
      console.log(form.value);
    } else {
      this.updateRecord(form);
    }
  }
  //create function to communicate to service then model
  insetRecord(form: NgForm) {
    console.log(form);
    this.service.postPatient(form.value).subscribe(response => {
      console.log("the response");
      console.log(response);
      //reset the form
      this.resetForm(form);
      //call to refresh the data
      this.service.getPatients();
    });
  }
  //update record
  updateRecord(form: NgForm) {
    this.service.updateRecord(form.value).subscribe(response => {
      console.log("update the record");
      this.resetForm(form);
      this.service.getPatients();
    });
  }
}
