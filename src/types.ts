/* eslint-disable linebreak-style */
import { type ViteSSGContext } from "vite-ssg";

export type UserModule = (ctx: ViteSSGContext) => void;

export interface plan {
    id: number
    type: string
    price: number
    name: string
    active: boolean
}
