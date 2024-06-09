import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, switchMap, throwError } from 'rxjs';
import { LoginRequestI, LoginResponseI } from 'src/app/interfaces/login.interface';
import { UserI } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<LoginResponseI> = new BehaviorSubject<LoginResponseI>({} as LoginResponseI);

  constructor(private userService: UserService) { }

  login(credentials: LoginRequestI): Observable<LoginResponseI> {
    return this.userService.getUsers()
      .pipe(
        catchError(error => {
          console.error('Error al obtener usuarios:', error);
          return of([] as UserI[]);
        }),
        map((data: UserI[]) => {
          const user = data.find(u => u.username === credentials.username && u.password === credentials.password);
          if (user) {
            const response: LoginResponseI = {
              data: {
                id: user.id,
                username: user.username,
                email: user.email,
              },
  
              message: "Success authentication"
            };    
            this.currentUserData.next(response);
            this.currentLoginOn.next(true);
            return response;
          } else{
            throw new Error('Invalid credentials');
          } 
        })
      );
  }

  registerUser(newUser: UserI):Observable<LoginResponseI>{
    console.log("Que obtiene el servicio: ", newUser);
    return this.userService.getUsers()
      .pipe(
        catchError(error => {
          console.error('Error al obtener usuarios: ', error);
          return of([] as UserI[]);
        }),
        switchMap((users: UserI[]) => {
          console.log("Lista de usuarios obtenidos: ", users);
          const existingUser =  users.find(user => user.email === newUser.email || user.username === newUser.username);
          if(existingUser){
            return throwError(() => new Error('User already exists with the same email or username'));
          }
          else{
            return this.userService.addUser(newUser);
          }
        }),
        map((user: UserI) => {
          console.log("Respuesta del registro del nuevo usuario: ", user);
          const response: LoginResponseI = {
            data: {
              id: user.id,
              username: user.username,
              email: user.email,
            },
            message: "User registered succesfully"
          };
          return response;
        })
      );
  }
}
