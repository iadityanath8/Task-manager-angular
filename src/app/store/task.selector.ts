import { createSelector } from "@ngrx/store";
import { TaskState } from "./task.reducer";

export const selectTaskState = (state: { tasks: TaskState }) => state.tasks;


export const selectAllTasks = createSelector(
    selectTaskState,
    (taskState: TaskState) => taskState.tasks
);

export const selectAllHist = createSelector(
    selectTaskState,
    (taskstate: TaskState) => taskstate.history    
)