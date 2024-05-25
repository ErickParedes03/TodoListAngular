import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/auth/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  private subscription!: Subscription;
  userData: any;

  constructor(private loginService: LoginService) {}

  ngOnInit(){
    this.subscription = this.loginService.currentUserData.subscribe(data => {
      this.userData = data;
      console.log('Received user data:', this.userData);
    });
  }
}
