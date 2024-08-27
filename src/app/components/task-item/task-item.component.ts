import { Component, Input } from '@angular/core';
import { Task } from '../../store/task.model';
import { Store } from '@ngrx/store';
import { completeTask, deleteHist, removeTask } from '../../store/task.actions';
import { UpdateTaskComponent } from "../update-task/update-task.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [UpdateTaskComponent,CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})

export class TaskItemComponent {
  @Input() task!: Task;
  showPopup = false
  @Input() ishist  = false
  constructor(private store: Store){

  }
  
  updateTask(task:Task){
    this.showPopup = true;
  }

  deleteTask(taskId: number){
    if(this.ishist){
      this.store.dispatch(deleteHist({id: taskId}))
    }else{
      this.store.dispatch(removeTask({id: taskId}))
    }
  }

  onComplete(id: number){
    this.store.dispatch(completeTask({id: this.task.id}))
  }

  closePopup(){
    this.showPopup = false;
  }
}
