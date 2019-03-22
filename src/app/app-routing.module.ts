import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TableOverviewExampleComponent } from "./datatable/table-overview-example/table-overview-example.component";
import { EmployeesComponent } from "./employees/employees.component";

const routes: Routes = [
  { path: "", redirectTo: "patient", pathMatch: "full" },
  { path: "patient", component: EmployeesComponent },
  { path: "table", component: TableOverviewExampleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
