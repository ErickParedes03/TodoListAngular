import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';
import { authGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  { path: ' ', redirectTo: 'login', pathMatch: 'full' }, ///Si no hay "path" se redirecciona al login
  { path: 'login', component: LoginComponent  },
  { path: 'sign-up', component: SignUpComponent  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
  //{ path: 'dashboard', component: DashboardComponent  },
  { path: '**', redirectTo: 'login', pathMatch:'full' } //Si el "path" NO EXISTE se redireciona al login

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
