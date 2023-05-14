import axiosInstance from '@/api/request'
type HotServiceRes = {
    data:Array<HotServiceConent>
}
export interface HotServiceConent {
    name:string
    children:Array<any>
}

//用户密码登陆
export const HotService = (params?:object ):Promise<HotServiceRes> =>{
    return axiosInstance({
        url:'/hotproduct',
        method:'GET',
        params
    })
}