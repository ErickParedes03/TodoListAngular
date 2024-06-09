import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from '../../validators/password.validator';
import { v4 as uuidv4 } from 'uuid';
import { UserI } from 'src/app/interfaces/user.interface';
import { LoginService } from '../../services/login.service';
import { NgxToastService } from 'ngx-toast-notifier';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  showPassword = false
  signUpForm!: FormGroup
  signUpError = '';
  ConfirmPassword='';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private ngxToastService: NgxToastService
  ){}
  ngOnInit(): void {
    this.signUpForm = this.initForm();
  }

  initForm():FormGroup{
    return this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password:['', [Validators.required]],
      ConfirmPassword:['', [Validators.required]]
    }, { validator: ConfirmPasswordValidator.MatchPassword } as AbstractControlOptions
    );
  }

  passwordMatchValidator(form: FormGroup){
    const password = form.get('password')?.value;
    const ConfirmPassword = form.get('ConfirmPassword')?.value;
    return password === ConfirmPassword ? null : { 'passwordMismatch': true};
  }

  onSubmit(){
    if (this.signUpForm.valid) {
      const newUser: UserI = this.signUpForm.value;
      newUser.id = uuidv4();
      this.loginService.registerUser(newUser).subscribe({
        next: (response) => {
          console.log('User registered: ', response);
          this.ngxToastService.onSuccess('Success!','Sign up succes')
          this.router.navigateByUrl('/login');
          this.signUpForm.reset();
        },
        error: (error) => {
          console.log('Error al registrar usuario: ', error);
          this.signUpError = error
          this.ngxToastService.onDanger('Error!','Sign uo error')
        }
      });
    } else{
      this.signUpForm.markAllAsTouched();
      alert("Error al registrar los datos")
    }
  }

}
