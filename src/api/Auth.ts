import axiosInstance from '@/api/request'

//用户密码登陆
export const login = (params:object) =>{
    return axiosInstance({
        url:'/login',
        method:'GET',
        params
    })
}