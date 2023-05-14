import axios from 'axios'

// 初始化一个axios实例
var instance = axios.create({
  // 请求前缀
  baseURL: 'http://127.0.0.1:3001/api',
  // 请求超时时间
  timeout: 30000,
});

// 设置token的方法
export const setToken = (token:string | null)=>{
  // 将token存放到axios的请求头中
  // 因为服务器是根据请求头中的token去验证接口的访问权限的
  instance.defaults.headers.common['token'] = token;
}

// 导出axios实例
export default instance