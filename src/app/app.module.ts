import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxToastNotifierModule } from 'ngx-toast-notifier';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteConfirmationComponent } from './shared/modals/delete-confirmation/delete-confirmation.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { TaskService } from './services/task.service';
import { SpinnerInterceptor } from './shared/spinner/spinner.interceptor';
import { SharedModule } from './shared/shared.module';
import { AccountComponent } from './account/account.component';
import { AccountModule } from './account/account.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    DeleteConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    NgxToastNotifierModule.forRoot(), 
    SharedModule,
    AccountModule
  ],
  providers: [
    TaskService,
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
