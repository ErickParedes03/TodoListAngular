import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  showPassword = false
  signUpForm!: FormGroup
  ConfirmPassword='';
  constructor(
    private fb: FormBuilder,
    private router: Router,
  ){}
  ngOnInit(): void {
    this.signUpForm = this.initForm();
  }

  initForm():FormGroup{
    return this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password:['', [Validators.required]],
      ConfirmPassword:['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup){
    const password = form.get('password')?.value;
    const ConfirmPassword = form.get('ConfirmPassword')?.value;
    return password === ConfirmPassword ? null : { 'passwordMismatch': true};
  }

  onSubmit(){
    const formValue= this.signUpForm.value;
    console.log('Form submitted with value: ', formValue);
    this.router.navigateByUrl('/login');
  }

}
