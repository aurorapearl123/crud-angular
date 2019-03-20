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
  // //default value for cg editor

  ckconfig = {
    // include any other configuration you want
    extraPlugins: [this.TheUploadAdapterPlugin]
  };

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
    });
  }
  //update record
  updateRecord(form: NgForm) {
    this.service.updateRecord(form.value).subscribe(response => {
      this.resetForm(form);
      this.service.getPatients();
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

  TheUploadAdapterPlugin(Editor) {
    console.log("TheUploadAdapterPlugin called");
    Editor.plugins.get("FileRepository").createUploadAdapter = loader => {
      return new UploadAdapter(
        loader,
        "http://localhost/project/special/kitrol/api/upload-image"
      );
    };
  }
}

class UploadAdapter {
  loader; // your adapter communicates to CKEditor through this
  url;
  constructor(loader, url) {
    this.loader = loader;
    this.url = url;
    console.log("Upload Adapter Constructor", this.loader, this.url);
  }

  upload() {
    // const data = new FormData();
    // data.append("upload", this.loader.file);

    // return this.loader.file.then(
    //   file =>
    //     new Promise((resolve, reject) => {
    //       console.log("THE FILE");
    //       console.log(file);
    //     })
    // );

    // const xhr = new XMLHttpRequest();
    // xhr.open(
    //   "POST",
    //   '"http://localhost/project/special/kitrol/api/upload-image',
    //   true
    // );
    // //xhr.responseType = "json";

    // const data = new FormData();

    // data.append("userFile", this.loader.file);
    // xhr.send(data);

    return new Promise((resolve, reject) => {
      console.log("UploadAdapter upload called", this.loader, this.url);
      console.log("the file we got was", this.loader.file);
      resolve({
        default:
          "http://localhost/project/special/kitrol/assets/img/uploads/15044671_1248176508586852_109767310_o.jpg"
      });
    });
  }

  abort() {
    console.log("UploadAdapter abort");
  }
}
