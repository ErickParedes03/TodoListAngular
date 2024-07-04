import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';
import { authGuard } from './auth/guards/auth.guard';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './account/components/profile/profile.component';
import { SecurityComponent } from './account/components/security/security.component';

const routes: Routes = [
  { path: ' ', redirectTo: 'login', pathMatch: 'full' }, ///Si no hay "path" se redirecciona al login
  { path: 'login', component: LoginComponent  },
  { path: 'sign-up', component: SignUpComponent  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
  { 
    path: 'account', 
    component: AccountComponent, 
    canActivate: [authGuard],
    children:[
      { path:'profile', component: ProfileComponent },
      { path:'security', component: SecurityComponent },
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: 'login', pathMatch:'full' } //Si el "path" NO EXISTE se redireciona al login

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
