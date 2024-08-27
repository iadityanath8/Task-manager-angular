import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskItemComponent } from '../task-item/task-item.component';
import { Observable } from 'rxjs';
import { Task } from '../../store/task.model';
import { select, Store } from '@ngrx/store';
import { selectAllTasks } from '../../store/task.selector';
import { TaskState } from '../../store/task.reducer';

@Component({
  selector: 'app-task-entry',
  standalone: true,
  imports: [CommonModule,TaskItemComponent],
  templateUrl: './task-entry.component.html',
  styleUrl: './task-entry.component.css'
})


export class TaskEntryComponent implements OnInit{
  tasks$: Observable<Task[]>

  constructor(private store: Store<{tasks: TaskState}>){
    this.tasks$ = this.store.pipe(select(selectAllTasks))
  }
  
  ngOnInit(): void {}
}
