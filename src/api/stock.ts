import axiosInstance from '@/api/request'
export type StockServiceRes = {
    data:Array<SellerServiceConent>
}
export interface SellerServiceConent {
    name:string
    value:number
}
//用户密码登陆
export const stockService = (params?:object ):Promise<any> =>{
    return axiosInstance({
        url:'/rank',
        method:'GET',
        params
    })
}