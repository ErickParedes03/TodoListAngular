import { Component } from '@angular/core';
import { TodoI } from 'src/app/interfaces/todo.interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  todoInput:string = "";
  todoPendingList: TodoI[] = [
    {
      taskName:"Tarea I",
      finished: false
    },
    {
      taskName:"Tarea II",
      finished: false
    },
    {
      taskName:"Tarea III",
      finished: false
    },
  ];
  todoFinishedList: TodoI[] = [
    {
      taskName:"Tarea IV",
      finished: true
    },
    {
      taskName:"Tarea V",
      finished: true
    },
  ];

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
