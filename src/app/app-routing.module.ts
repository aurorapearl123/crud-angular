import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TableOverviewExampleComponent } from "./datatable/table-overview-example/table-overview-example.component";
import { EmployeesComponent } from "./employees/employees.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { SigninComponent } from "./auth/signin/signin.component";
import { AuthGuardService } from "./auth/auth-guard.service";
import { AdminUserComponent } from "./admin/admin-user/admin-user.component";
import { AdminGuardService } from "./auth/admin-guard.service";

const routes: Routes = [
  { path: "", redirectTo: "patient", pathMatch: "full" },
  {
    path: "patient",
    component: EmployeesComponent,
    canActivate: [AuthGuardService]
  },
  { path: "table", component: TableOverviewExampleComponent },
  { path: "signup", component: SignupComponent },
  { path: "signin", component: SigninComponent },
  {
    path: "admin",
    component: AdminUserComponent,
    canActivate: [AdminGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
