import "hammerjs";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
//add the ng-toast to angular json style
//import { ToastrModule } from "ngx-toastr";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { EmployeesComponent } from "./employees/employees.component";
import { EmployeeComponent } from "./employees/employee/employee.component";
import { EmployeeListComponent } from "./employees/employee-list/employee-list.component";
import { EmployeeService } from "./shared/employee.service";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { TableOverviewExampleComponent } from "./datatable/table-overview-example/table-overview-example.component";

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
  MatFormFieldModule
} from "@angular/material";

import { CdkTableModule } from "@angular/cdk/table";

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent,
    TableOverviewExampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CKEditorModule,
    NgbModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    HttpClientModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatSortModule
    //ToastrModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent],
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatFormFieldModule
  ]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
