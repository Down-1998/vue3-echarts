import axiosInstance from '@/api/request'
type SellerServiceRes = {
    data:Array<SellerServiceConent>
}
export interface SellerServiceConent {
    name:string
    value:number
}

export const sellerService = (params?:object ):Promise<SellerServiceRes> =>{
    return axiosInstance({
        url:'/seller',
        method:'GET',
        params
    })
}