export type MapServiceRes = Array<MapDataRes>
export interface MapDataRes {
    name:string
    children:Array<ChildrenData>
}
export interface ChildrenData {
    name:string
    value:Array<number>
}