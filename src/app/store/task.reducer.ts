import { createReducer, on } from "@ngrx/store";
import { addTask, completeTask, deleteHist, loadHist, loadTasks, removeTask, updateTask } from "./task.actions";
import { Task } from "./task.model";

export interface TaskState {
    tasks: Task[]
    history: Task[]
}

export const initialstate: TaskState = {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
    history: JSON.parse(localStorage.getItem('history') || '[]')
};

const saveToLocalStorage = (state: TaskState) => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
    localStorage.setItem('history', JSON.stringify(state.history));
};


export const taskreducer = createReducer(
    initialstate,

    on(addTask, (state, { task }) => {
        const updatedTasks = [...state.tasks, task];
        saveToLocalStorage({ ...state, tasks: updatedTasks });
        return { ...state, tasks: updatedTasks };
    }),

    on(removeTask, (state, { id }) => {
        const updatedTasks = state.tasks.filter(task => task.id !== id);
        saveToLocalStorage({ ...state, tasks: updatedTasks });
        return { ...state, tasks: updatedTasks };
    }),

    on(updateTask, (state, { task }) => {
        const updatedTasks = state.tasks.map(t => t.id === task.id ? task : t);
        saveToLocalStorage({ ...state, tasks: updatedTasks });
        return { ...state, tasks: updatedTasks };
    }),


    on(loadTasks, (state, { tasks }) => {
        saveToLocalStorage({ ...state, tasks });
        return { ...state, tasks };
    }),

    on(completeTask, (state, { id }) => {
        const taskToComplete = state.tasks.find(task => task.id === id);
        const updatedTasks = state.tasks.filter(task => task.id !== id);
        const updatedHistory = taskToComplete ? [...state.history, { ...taskToComplete, completed: true, completiondate: new Date().toISOString() }] : state.history;
        saveToLocalStorage({ ...state, tasks: updatedTasks, history: updatedHistory });
        return { ...state, tasks: updatedTasks, history: updatedHistory };
    }),

    on(loadHist, (state, { history }) => {
        saveToLocalStorage({ ...state, history });
        return { ...state, history };
    }),

    on(deleteHist, (state, { id }) => {
        const updatedTasks = state.history.filter(task => task.id !== id);
        saveToLocalStorage({ ...state, history: updatedTasks });
        return { ...state, history: updatedTasks };
    }),
)