import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "src/app/shared/employee.service";
import { NgForm } from "@angular/forms";
import { from } from "rxjs";
//import { ToastrService } from "ngx-toastr";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ChangeEvent } from "@ckeditor/ckeditor5-angular/ckeditor.component";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"]
})
export class EmployeeComponent implements OnInit {
  //data for ckeditor
  public Editor = ClassicEditor;

  //after import this emploueeservice make sure to add to appmodule to provider
  //then make a from ui
  //add the toastr service
  constructor(private service: EmployeeService) {}

  ngOnInit() {
    //next initialize form
    this.resetForm();
  }

  //we need this function to our form
  //to set the form to nullable add ?
  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.service.formData = {
      patientID: null,
      firstName: "",
      middleName: "",
      lastName: "",
      comment: ""
    };

    //reset ckeditor
    //this.editorData = "";
  }

  //click event from html
  onSubmit(form: NgForm) {
    if (form.value.patientID == null) {
      this.insetRecord(form);
    } else {
      this.updateRecord(form);
    }
  }
  //create function to communicate to service then model
  insetRecord(form: NgForm) {
    console.log(form);
    this.service.postPatient(form.value).subscribe(response => {
      //reset the form
      this.resetForm(form);
      //call to refresh the data
      this.service.getPatients();
      //call to refresh the data in datatable
      this.service.getPatientsDatatable();
    });
  }
  //update record
  updateRecord(form: NgForm) {
    this.service.updateRecord(form.value).subscribe(response => {
      this.resetForm(form);
      this.service.getPatients();
      //call to refresh the data in datatable
      this.service.getPatientsDatatable();
    });
  }

  //onchange function for ckeditor
  public onChange({ editor }: ChangeEvent) {
    const data = editor.getData();
    //this.service.editorData = data;
  }

  public clearFrom(event: Event) {
    console.log("hello clear");
    this.resetForm();

    //console.log(event);
  }

  onReady(eventData) {
    eventData.plugins.get("FileRepository").createUploadAdapter = function(
      loader
    ) {
      return new UploadAdapter(loader);
    };
  }
}

class UploadAdapter {
  readonly rootURL = "http://localhost/project/special/kitrol/api/";
  readonly imageURL = "http://localhost/project/special/kitrol/";
  constructor(public loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      file =>
        new Promise((resolve, reject) => {
          const data = new FormData();

          data.append("userFile", file);
          var xhr = new XMLHttpRequest();
          xhr.open("POST", this.rootURL + "upload-image");
          //xhr.setRequestHeader("Content-Type", "multipart/form-data");

          xhr.send(data);
          xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;
            if (xhr.status != 200) {
              //console.log("Status: " + xhr.status);
            } else {
              //console.log("error");
              //console.log(xhr.responseText);
              //var _image = JSON.parse(xhr.responseText);
              //console.log("response image");
              // console.log(_image.data);
            }
          };
          var myReader = new FileReader();
          myReader.onloadend = e => {
            //resolve({ default: myReader.result });
            resolve({
              default: this.imageURL + "assets/img/uploads/" + file.name
            });
          };

          myReader.readAsDataURL(file);
        })
    );
  }
}
