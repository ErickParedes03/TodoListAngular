import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequestI } from 'src/app/interfaces/login.interface';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { NgxToastService } from 'ngx-toast-notifier';

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
    private loginService: LoginService,
    private ngxToastService: NgxToastService
  ){}

  ngOnInit(): void {
    this.loginForm = this.initForm();
    this.loginForm.get('username')?.statusChanges.subscribe(
      () => {
        if (this.loginForm.get('username')?.touched) this.loginError = ''     
    });
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
          this.ngxToastService.onSuccess('Success!','Login success')
        },
        error: (errorData) => {
          console.log("errorData: ", errorData);
          this.loginError = errorData;
          this.ngxToastService.onDanger('Error!','Login error')
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


