import axiosInstance from '@/api/request'
export type RankServiceRes = {
    data:Array<SellerServiceConent>
}
export interface SellerServiceConent {
    name:string
    value:number
}
//用户密码登陆
export const rankService = (params?:object ):Promise<RankServiceRes> =>{
    return axiosInstance({
        url:'/rank',
        method:'GET',
        params
    })
}