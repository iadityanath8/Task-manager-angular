import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TaskEntryComponent } from './components/task-entry/task-entry.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskHistoryComponent } from './components/task-history/task-history.component';

export const routes: Routes = [
    {path: '', component: TaskEntryComponent},
    {path: 'add-task', component: AddTaskComponent},
    {path: 'history', component: TaskHistoryComponent}
];
