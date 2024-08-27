export interface Task{
    id: number,
    title: string,
    description: string
    completed: boolean
    duedate: string
    completiondate: string | null
    priority: 'Low' | 'Medium' | 'High'
}