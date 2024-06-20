import { CommonModule } from "@angular/common";
import { SpinnerComponent } from "./spinner/spinner.component";
import { NgModule } from "@angular/core";
import { LogoutConfirmationComponent } from './modals/logout-confirmation/logout-confirmation.component';


@NgModule({
    declarations: [
        SpinnerComponent,
        LogoutConfirmationComponent,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        SpinnerComponent,
        LogoutConfirmationComponent,
    ]
})

export class SharedModule { }