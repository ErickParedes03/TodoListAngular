import { Component } from '@angular/core';
import { catchError } from 'rxjs';
import { TodoI } from 'src/app/interfaces/todo.interfaces';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  todoInput:string = "";
  todoPendingList: TodoI[] = [];
  todoFinishedList: TodoI[] = [];
  constructor(private taskService: TaskService) {}
  ngOnInit(): void {
    this.getTasks();
  }
  getTasks(){
    this.taskService.getTasks()
      .pipe(
        catchError(error => {
          console.error('Error al obtener tareas:', error);
          return [];
        })
      )
      .subscribe( res => {
        console.log("Resss:", res);
        this.todoPendingList = res.filter(task => !task.finished);
        this.todoFinishedList = res.filter(task => task.finished);
      })
  }

  finishTodo(position : number){
    const item = this.todoPendingList.splice(position,1);
    this.todoFinishedList.push(item[0]);
  }

  openTodo(position : number){
    const item = this.todoFinishedList.splice(position,1);
    this.todoPendingList.push(item[0]);
  }

  createTodo(){
    this.todoPendingList.push(
      {
        taskName: this.todoInput,
        finished: false
      }
    )
    this.todoInput = "";
  }

  deleteTodoPrev(position : number, type: string){
    type == "pending" ? this.todoPendingList.splice(position,1) : this.todoFinishedList.splice(position,1);
  }
}
