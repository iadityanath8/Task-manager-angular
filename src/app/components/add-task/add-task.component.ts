import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Task } from '../../store/task.model';
import { addTask } from '../../store/task.actions';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})


export class AddTaskComponent {
  taskForm: FormGroup;
  
  constructor(private fb: FormBuilder, private store: Store){
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      completed: [false],
      duedate: [''],
      priority: ['low', Validators.required] // Adjust priority options as needed
    });
  }

  onSubmit(){
    if(this.taskForm.valid){
      const task : Task = {
        id: new Date().getTime(),
        ...this.taskForm.value
      };
      this.store.dispatch(addTask({task}));
      this.taskForm.reset();
    }
  }
}
