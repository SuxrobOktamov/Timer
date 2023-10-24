export interface Colors {
    id: number
    color?: string
    variants: {
        id: number
        color: string
        active: boolean
    }[]
}
