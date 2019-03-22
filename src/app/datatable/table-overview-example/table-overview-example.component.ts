import { Component, ViewChild, OnInit } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { EmployeeService } from "src/app/shared/employee.service";
import { Employee } from "src/app/shared/employee.model";
import * as jsPDF from "jspdf";
import "jspdf-autotable";

@Component({
  selector: "app-table-overview-example",
  templateUrl: "./table-overview-example.component.html",
  styleUrls: ["./table-overview-example.component.css"]
})
export class TableOverviewExampleComponent implements OnInit {
  displayedColumns = ["FirstName", "MiddleName", "LastName", "actions"];
  //add matdatatablesource
  listData: MatTableDataSource<any>;
  //order to use the sorting header you need to add viewchild
  @ViewChild(MatSort) sort: MatSort;
  //after you add viewchild for sorting, you need to configure the list
  //create another properties for paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;
  //after you add viewchild for pagination, you need to configure the list
  list;
  //for two way binding for search
  searchKey: string;

  constructor(private service: EmployeeService) {}

  ngOnInit() {
    //get all employee list
    this.service.getPatientsDatatable().subscribe(list => {
      //console.log(list["data"]);
      // let array = list["data"].map(item => {
      //   //console.log(item);
      //   return {
      //     item
      //   };
      // });
      this.list = list["data"];
      this.listData = new MatTableDataSource(this.list);
      //configure the list to impliment the sortin
      this.listData.sort = this.sort;
      //configure the list for pagination
      this.listData.paginator = this.paginator;
      //
    });
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  //update the employee click event
  updatePatient(patient: Employee) {
    console.log("the data");
    console.log(patient);
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
