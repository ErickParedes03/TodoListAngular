import { Component } from '@angular/core';
import { catchError } from 'rxjs';
import { TaskI } from 'src/app/interfaces/task.interface';
import { TodoI } from 'src/app/interfaces/todo.interfaces';
import { TaskService } from 'src/app/services/task.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  todoInput:string = "";
  taskToDelete = {
    index: 0,
    type: '',
    task:{
      id: '',
      taskName: '',
      finished: false
    }
  };
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

  openTodo(position : number){
    const taskToUpdate = this.todoFinishedList[position];
    taskToUpdate.finished = false;

    this.taskService.updateTask(taskToUpdate.id, taskToUpdate)
      .pipe(
        catchError(error => {
          console.error('Error al reactivar la tarea:', error);
          return [];
        })
      )
      .subscribe(
        (response: any) => {
          console.log('Data update successfully:', response);
        }
      )

      const item = this.todoFinishedList.splice(position,1);
      this.todoPendingList.push(item[0]);
  }

  createTodo(){
    const newTask = {
      id: uuidv4(),
      taskName: this.todoInput,
      finished: false
    };
    this.taskService.addTask(newTask)
      .pipe(
        catchError(error => {
          console.error("Error al registrar la tarea:", error);
          return [];
        })
      )
      .subscribe(
        (response: any) => {
          console.log('Data sent succesfully:', response);
        }
      )
      this.todoPendingList.push(newTask);
      this.todoInput = "";
    
  }

  finishTodo(position : number){
    const taskToUpdate = this.todoPendingList[position];
    taskToUpdate.finished = true;

    this.taskService.updateTask(taskToUpdate.id, taskToUpdate)
      .pipe(
        catchError(error => {
          console.error('Error al finalizar la tarea:', error);
          return [];
        })
      )
      .subscribe(
        (response: any) => {
          console.log('Data updated succesfully:', response);
        }
      )

      const item = this.todoPendingList.splice(position,1);
      this.todoFinishedList.push(item[0]);
  }

  deleteTodoPrev(position : number, type: string){
    type == "pending" ? this.todoPendingList.splice(position,1) : this.todoFinishedList.splice(position,1);
  }

  openModal(index: number, listName: TaskI[], type: string) {
    const modelDiv = document.getElementById('deleteModal');
    if(modelDiv != null) modelDiv.style.display = 'block';
    this.taskToDelete.task=listName[index];
    this.taskToDelete.index = index;
    this.taskToDelete.type = type;
  }

  closeModal() {
    const modelDiv = document.getElementById('deleteModal');
    if(modelDiv != null) modelDiv.style.display = 'none';
    this.taskToDelete.task = { id: '', taskName: '', finished: false };
    this.taskToDelete.index = 0;
    this.taskToDelete.type = ""
  }

  deleteTodo() {
    this.taskToDelete.type=="pending"
      ? this.todoPendingList.splice(this.taskToDelete.index,1)
      :this.todoFinishedList.splice(this.taskToDelete.index,1);

    this.taskService.deleteTask(this.taskToDelete.task.id)
      .pipe(
        catchError(error => {
          console.error('Error al eliminar la tarea:', error);
          return [];
        })
      )
      .subscribe(
        (response: any) => {
          console.log('Data deleted successfully:', response);
        }
      )

      this.closeModal();
  }

}
