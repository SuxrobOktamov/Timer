export interface Task {
    id: number
    work: string
    title?: string
    count: number
    finishedCount: number
    active: boolean
    isEdit: boolean
    completed: boolean
}
