import { Injectable } from "@angular/core";
import { Employee } from "./employee.model";
//in order to use this http import the httpmodule to appmodule
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  formData: Employee;
  //get all patient
  list: Employee[];
  //create base url
  readonly rootURL = "http://localhost/project/special/kitrol/api/";
  //initialize HttpClient so that we can use
  constructor(private http: HttpClient) {}

  postPatient(formData: Employee) {
    let body = new FormData();
    body.append("firstName", formData.firstName);

    body.append("lastName", formData.lastName);
    body.append("middleName", formData.middleName);

    return this.http.post(this.rootURL + "patient", body);
  }

  getPatients() {
    this.http
      .get(this.rootURL + "patient-all")
      .toPromise()
      .then(res => {
        this.list = res["data"] as Employee[];
      });
  }

  updateRecord(formData: Employee) {
    let body = new FormData();
    body.append("firstName", formData.firstName);

    body.append("lastName", formData.lastName);
    body.append("middleName", formData.middleName);
    body.append("patientID", formData.patientID + "");

    return this.http.post(this.rootURL + "patient-edit", body);
  }

  deleteRecord(id: number) {
    return this.http.delete(this.rootURL + "patient-delete/" + id);
  }
}
