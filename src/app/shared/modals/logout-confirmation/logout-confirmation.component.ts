import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoginResponseI } from 'src/app/interfaces/login.interface';

@Component({
  selector: 'app-logout-confirmation',
  templateUrl: './logout-confirmation.component.html',
  styleUrls: ['./logout-confirmation.component.css']
})
export class LogoutConfirmationComponent {
  @Input() userData!: LoginResponseI;
  @Output() executeLogout = new EventEmitter<boolean>();

  closeModal(isLogout: boolean) {
    this.executeLogout.emit(isLogout);
  }
  
}
