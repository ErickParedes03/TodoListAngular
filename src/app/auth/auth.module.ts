import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { LoginComponent } from "./components/login/login.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations:[
        LoginComponent,
        SignUpComponent
    ],
    imports:[
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class AuthModule { }