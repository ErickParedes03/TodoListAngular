import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AccountComponent } from "./account.component";
import { SecurityComponent } from "./components/security/security.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";

@NgModule({
    declarations: [
      ProfileComponent,
      SecurityComponent,
      SidebarComponent,
      AccountComponent,
    ],
    imports: [
      CommonModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
      SharedModule
    ]
  })
  export class AccountModule { }