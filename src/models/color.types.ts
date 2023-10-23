export interface Color {
    id: number
    color?: string
    obj: {
        id: number
        color: string
        active: boolean
    }[]
}
