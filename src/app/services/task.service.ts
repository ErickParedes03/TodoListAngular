import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { environment } from "src/environments/enviroment";
import { TaskI } from "../interfaces/task.interface";

const baseUrl = `${environment.api}/tasks`;

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    constructor(private http: HttpClient) {}

    getTasks(): Observable<TaskI[]>{
        return this.http.get<TaskI[]>(baseUrl).pipe(
            catchError((error) => {
                console.log('Error al obtener tareas: ', error);
                return throwError(error);
            })
        );
    }

    getTaskById(id: string): Observable<TaskI>{
        return this.http.get<TaskI>(`${baseUrl}/${id}`);
    }

    addTask(task: TaskI){
        return this.http.post(baseUrl, task);
    }

    updateTask(id: string, task: TaskI){
        return this.http.put(`${baseUrl}/${id}`, task);
    }

    deleteTask(id: string){
        return this.http.delete(`${baseUrl}/${id}`);
    }
}