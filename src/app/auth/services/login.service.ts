import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { LoginRequestI } from 'src/app/interfaces/login.interface';
import { UserI } from 'src/app/interfaces/user.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<UserI> = new BehaviorSubject<UserI>({});

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequestI):Observable<UserI>{
    return this.http.get<UserI>("../../../assets/data/data_login.json")
    .pipe(
      map((data:UserI) => {
        if(credentials.username === data.username && credentials.password === data.password){
          this.currentUserData.next({
            id: data.id,
            username: data.username,
            email: data.email,
            message: "Success authentication"
          });
          this.currentLoginOn.next(true);
          return data;
        } else{
          throw new Error('Invalid credentials');
        }
      }),
    );
  }
}
