import { createAction, props } from "@ngrx/store";
import { Task } from "./task.model";

export const addTask = createAction(
    '[TASK] Add Task',
    props<{ task: Task }>()
)

export const removeTask = createAction(
    '[Task] Remove Task',
    props<{ id: number }>()
)


export const loadTasks = createAction(
    '[Task] Load Tasks',
    props<{ tasks: Task[] }>()
)

export const updateTask = createAction(
    '[TASK] Update Task',
    props<{ task: Task }>() // Make sure 'task' is the property name
)

export const completeTask = createAction(
    '[TASK] Complete Task',
    props<{id:number}>()
)

export const loadHist = createAction(
    '[TASK] Load Hist',
    props<{history: Task[]}>()
)

export const deleteHist = createAction(
    '[TASK] Delete Hist',
    props<{id: number}>()
)