import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Task } from '../../store/task.model';
import { updateTask } from '../../store/task.actions';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css'
})

export class UpdateTaskComponent implements OnInit{
  @Input() task!: Task
  @Output() close = new EventEmitter<void>()
  taskForm!: FormGroup
  
  constructor(private fb: FormBuilder,private store: Store){}
  
  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: [this.task.title],
      description: [this.task.description],
      completed : [this.task.completed],
      duedate : [this.task.duedate],
      priority: [this.task.priority]
    })   
  }
  
  onSubmit(){
    const updated_task:Task = {
      ...this.task,
      ...this.taskForm.value
    }
    this.store.dispatch(updateTask({task: updated_task}))
    this.closePopup()
  }

  closePopup(){
    this.close.emit()
  }
}
