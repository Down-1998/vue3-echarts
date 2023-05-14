import axiosInstance from '@/api/request'

interface MapServiceRes {
    data:Array<MapDataRes>
}
interface MapDataRes {
    name:string
    children:Array<ChildrenData>
}
interface ChildrenData {
    name:string
    value:Array<number>
}

export const mapService = (params?:object ):Promise<MapServiceRes> =>{
    return axiosInstance({
        url:'/map',
        method:'GET',
        params
    })
}

