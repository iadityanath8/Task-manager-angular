import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TaskEntryComponent } from "./components/task-entry/task-entry.component";
import { Store } from '@ngrx/store';
import { Task } from './store/task.model';
import { loadHist, loadTasks } from './store/task.actions';
import { Observable } from 'rxjs';
import { selectAllTasks } from './store/task.selector';
import { saveAs } from 'file-saver'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskEntryComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})


export class AppComponent implements OnInit {
  title = 'task-manager';
  tasks$: Observable<Task[]>

  constructor(private store: Store<{ tasks: { tasks: Task[], history: Task[] } }>) {
    this.tasks$ = this.store.select(selectAllTasks); // Make sure you use the correct selector
  }

  exportToCSV(event: Event) {
    let count = 0
    event.preventDefault()
    event.stopPropagation()
    this.tasks$.subscribe(tasks => {
      if (tasks.length == 0) {
        alert("No task to export ")
        return
      }

      const rows = [];
      const headers = ['ID', 'Title', 'Description', 'Due Date', 'Completion Date', 'Priority'];
      rows.push(headers.join(','));


      for (const task of tasks) {
        const row = [
          task.id,
          task.title,
          task.description,
          task.duedate,
          task.completiondate || '', // Handle missing completion date
          task.priority
        ];
        rows.push(row.join(','));
      }

      if (count == 0) {
        const csvContent = 'data:text/csv;charset=utf-8,' + encodeURI(rows.join('\n'));
        const link = document.createElement('a');
        link.setAttribute('href', csvContent);
        link.setAttribute('download', 'tasks.csv');
        link.classList.add('csv-download'); // Add class to the <a> tag
        document.body.appendChild(link);
        link.click();
        count++;
      }
      count++;
      // document.body.removeChild(link); // Clean up
    }
    )
  }

  ngOnInit(): void {
    const taskfromls = localStorage.getItem("tasks")
    const histfromls = localStorage.getItem("history")

    const dummyTasks: Task[] = [
      { id: 1, title: 'Sample Task 1', description: "sample should be completed as soon as possible", completiondate: null, completed: false, duedate: '2024-12-31', priority: 'Low' },
      { id: 2, title: 'Sample Task 2', description: "Sample 2 should be completed as soon as possible ", completiondate: null, completed: true, duedate: '2024-11-30', priority: 'High' }
    ];

    const tasks = taskfromls ? JSON.parse(taskfromls) : dummyTasks;
    const history = histfromls ? JSON.parse(histfromls) : [];

    this.store.dispatch(loadTasks({ tasks: tasks }));
    this.store.dispatch(loadHist({ history }))
  }
}
