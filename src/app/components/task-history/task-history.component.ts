// task-history.component.ts
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../store/task.model';
import { TaskState } from '../../store/task.reducer';
import { select, Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { selectAllHist } from '../../store/task.selector';
import { deleteHist, removeTask } from '../../store/task.actions';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-task-history',
  standalone: true,
  imports: [CommonModule,TaskItemComponent],
  templateUrl: './task-history.component.html',
  styleUrls: ['./task-history.component.css']
})
export class TaskHistoryComponent {
  history$: Observable<Task[]>;

  constructor(private store: Store<{ tasks: TaskState }>) {
    this.history$ = this.store.pipe(select(selectAllHist));
  }

  onDelete(id: number){
    console.log("deleteing this thing in here ok ", id)
    this.store.dispatch(deleteHist({id}))
  }
}
