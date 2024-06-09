import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserI } from "../interfaces/user.interface";
import { environment } from "src/environments/enviroment";

const baseUrl = `${environment.api}/users`;

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private http:HttpClient){}

    getUsers(): Observable<UserI[]>{
        return this.http.get<UserI[]>(baseUrl);
    }

    getUserById(id: number): Observable<UserI>{
        return this.http.get<UserI>('${baseUrl}/${id}');
    }

    addUser(task: UserI){
        return this.http.post(baseUrl, task);
    }

    updateUser(id: number, task: UserI){
        return this.http.put('${baseUrl}/${id}', task);
    }

    deleteUser(id: number){
        return this.http.delete('${baseUrl}/${id}');
    }
}