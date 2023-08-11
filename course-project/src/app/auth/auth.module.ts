import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [{ path: "", component: AuthComponent }];

@NgModule({
  declarations: [AuthComponent],
  imports: [SharedModule, FormsModule, RouterModule.forChild(routes)],
})
export class AuthModule {}
