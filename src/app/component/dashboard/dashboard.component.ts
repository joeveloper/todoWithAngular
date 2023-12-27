import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../service/crud.service';
import { Task } from '../../model/task';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  taskObj: Task = new Task();
  taskArray: Task[] = [];

  addTaskValue: string = '';

  editTaskValue: string = '';

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task()
    this.taskArray = [];
    this.getAllTasks();
  }

  call(task: Task){
    this.taskObj = task;
    this.editTaskValue = task.task_name;
  }

  getAllTasks() {
    this.crudService.getAllTasks().subscribe(res=> { 
      this.taskArray = res;
    }, err=> {
      alert(err)
    }
     )}

  addTask(){
    this.taskObj.task_name = this.addTaskValue;
    console.log(this.taskObj);
    this.crudService.addTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
      this.addTaskValue = '';
    }, err=> {
      alert(err)
    });
  }

  editTask(){
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    }, err=> {
      alert("failed to edit task")
    });
  }

  deleteTask(task: Task){
    this.crudService.deleteTask(task).subscribe(res => {
      this.ngOnInit();
    }, err=> {
      alert("faile to delete task")
    });
  }

}
