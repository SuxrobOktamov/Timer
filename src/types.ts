import { type ViteSSGContext } from "vite-ssg";

export type UserModule = (ctx: ViteSSGContext) => void;

export interface plan {
    id: number
    type: string
    price: number
    name: string
    active: boolean
}

export interface btn {
    name: string
    id: number
    active: boolean
    time: number
    color: string
    spendTime: string
}
