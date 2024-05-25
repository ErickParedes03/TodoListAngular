import { AbstractControl } from "@angular/forms";

export class ConfirmPasswordValidator {
    static MatchPassword(control: AbstractControl) {
        const password = control.get('password')?.value;
        const ConfirmPassword = control.get('ConfirmPassword')?.value;
        return password === ConfirmPassword ? null : { 'passwordMismatch':true};
    }
}