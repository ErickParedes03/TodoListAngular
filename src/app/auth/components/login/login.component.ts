import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequestI } from 'src/app/interfaces/login.interface';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  showPassword=false 
  loginForm!: FormGroup;
  loginError = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ){}

  ngOnInit(): void {
    this.loginForm = this.initForm();
  }

  initForm(): FormGroup{
    return this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value as LoginRequestI).subscribe({
        next: (userData) => {
          console.log("userData: ", userData);
        },
        error: (errorData) => {
          console.log("errorData: ", errorData);
          this.loginError = errorData;
        },
        complete: () => {
          console.log("Login completo");
          this.router.navigateByUrl('/dashboard');
          this.loginForm.reset();
        }
      })
    } else{
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos")
    }
  }
}


