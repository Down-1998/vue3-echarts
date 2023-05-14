import axiosInstance from '@/api/request'

interface TrendRes {
    data:dataRes
    
}
interface dataRes {
    commodity:commodityRes
    common:commonRes
    map:commodityRes
    seller:commodityRes
    type:Array<typeRes>
}
interface typeRes {
    key:string
    text:string
}
interface commonRes {
    month:Array<string>
}
interface commodityRes {
    base:number
    data:Array<commodityDataRes>
    title:string
    unit:string
}
interface commodityDataRes {
    name:string
    data:Array<string>
}

//用户密码登陆
export const trend = (params?:object ):Promise<TrendRes> =>{
    return axiosInstance({
        url:'/trend',
        method:'GET',
        params
    })
}