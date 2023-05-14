<template>
    <div class="box">
        <div class="content">
            <img class="login-img images" src="../assets/img/login.jpg" alt="登录">
            <img class="register-img images" src="../assets/img/register.jpg" alt="注册">
            <div class="login-wrapper">
                <div class="top-tips">
                    <span>大屏可视化</span>
                    <!-- <span class="top-tips-span">注册</span> -->
                </div>
                <h1 class="h1-text">登录</h1>
                <!-- <div class="other-login">
                    <img src="../assets/img/QQ.png" alt="">
                    <span>使用QQ登录</span>
                </div> -->
                <div class="login-form">
                    <div class="user-form form-item">
                        <div class="text-tips">
                            <span>账号</span>
                        </div>
                        <input type="text" v-model="user.username">
                    </div>
                    <div class="password-form form-item">
                        <div class="text-tips">
                            <span>密码</span>
                            <!-- <span class="forgot-password">忘记密码?</span> -->
                        </div>
                        <input type="password" v-model="user.password">
                    </div>
                    <button class="btn" @click="Login">登录</button>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script setup lang="ts">
// 导入请求对象
import { setToken } from '@/api/request'
import { login } from '@/api/Auth'
// 导入组合式api
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
// 创建路由器对象
let router = useRouter()
// 登录用户
let user = reactive({
    username: '',
    password: ''
})
// 登录方法
let Login = async () => {
    let { data } = await login(user)
    if (data.success) {
        // 设置token
        setToken(data.token)
        // 将token保存到浏览器缓存中
        sessionStorage.setItem('token', data.token)
        alert('登录成功！')
        // 跳转到首页
        router.push('/home')
    } else {
        alert('登录失败！登录名或密码错误！')
    }
}
// 取消方法
// let cancel = ()=>{
//   user.username = ""
//   user.password = ""
// }
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}

.box {
  background-color: rgb(51, 32, 108);
  width: 100vw;
  height: 100vh;
}
.box .content {
  width: 90vw;
  height: 85vh;
  background-color: rgb(228, 218, 232);
  border-radius: 40px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: 1s;
}
.box .content .images {
  margin-left: -150px;
  margin-right: 100px;
  position: absolute;
  left: 15%;
}
.box .content .login-img {
  width: 45%;
  height: 90%;
  border-radius: 15%;
}
.box .content .register-img {
  width: 45%;
  opacity: 0;
  border-radius: 15%;
}
.box .content .login-wrapper {
  width: 30vw;
  height: 70vh;
  border-radius: 40px;
  -webkit-backdrop-filter: blur(1px);
          backdrop-filter: blur(1px);
  background: rgba(244, 240, 245, 0.6);
  padding: 60px;
  box-sizing: border-box;
  position: absolute;
  right: 10%;
  transition: 1s;
}
.box .content .login-wrapper .top-tips span:nth-child(1) {
  font-size: 25px;
  font-weight: 600;
}
.box .content .login-wrapper .top-tips .top-tips-span {
  font-size: 15px;
  color: rgb(79, 133, 226);
  border-bottom: 1px solid rgb(79, 133, 226);
  float: right;
  line-height: 25px;
  cursor: pointer;
}
.box .content .login-wrapper h1 {
  font-size: 45px;
  margin: 20px 0;
}
.box .content .login-wrapper .other-login {
  width: 60%;
  height: 50px;
  border-radius: 10px;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  color: #fff;
  margin: 40px 0;
  background-color: rgb(79, 133, 226);
  padding-bottom: 2px;
  cursor: pointer;
}
.box .content .login-wrapper .other-login img {
  width: 25px;
  height: 25px;
  vertical-align: middle;
}
.box .content .login-wrapper .other-login span {
  vertical-align: middle;
}
.box .content .login-wrapper .login-form,
.box .content .login-wrapper .register-form {
  width: 100%;
}
.box .content .login-wrapper .login-form .form-item .text-tips,
.box .content .login-wrapper .register-form .form-item .text-tips {
  color: rgb(123, 122, 123);
  margin: 5px;
}
.box .content .login-wrapper .login-form .form-item .text-tips .forgot-password,
.box .content .login-wrapper .register-form .form-item .text-tips .forgot-password {
  font-size: 15px;
  color: rgb(79, 133, 226);
  border-bottom: 1px solid rgb(79, 133, 226);
  float: right;
  line-height: 25px;
  cursor: pointer;
}
.box .content .login-wrapper .login-form .form-item input,
.box .content .login-wrapper .register-form .form-item input {
  width: 100%;
  height: 50px;
  margin: 5px 0;
  border-radius: 5px;
  border: 0;
  font-size: 17px;
  padding: 0 20px;
  box-sizing: border-box;
}
.box .content .login-wrapper .login-form .form-item input:focus,
.box .content .login-wrapper .register-form .form-item input:focus {
  outline: none;
  border: 1px solid rgb(79, 133, 226);
}
.box .content .login-wrapper .login-form .btn,
.box .content .login-wrapper .register-form .btn {
  width: 150px;
  height: 50px;
  margin: 20px 0;
  background-color: rgb(59, 58, 59);
  border: 0;
  border-radius: 5px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
}
.box .content .login-wrapper .login-form {
  display: block;
}
.box .content .login-wrapper .register-form {
  display: none;
}

.add-class-content {
  background-color: rgb(156, 148, 208) !important;
  transition: 0.1s;
}

.add-class-login-img {
  -webkit-animation: disappear 0.3s forwards;
          animation: disappear 0.3s forwards;
  -webkit-animation-timing-function: ease;
          animation-timing-function: ease;
}

.add-class-login-img-show {
  -webkit-animation-delay: 1s;
          animation-delay: 1s;
  -webkit-animation: appear 1s forwards;
          animation: appear 1s forwards;
  -webkit-animation-timing-function: ease;
          animation-timing-function: ease;
}

.add-class-register-img {
  -webkit-animation: appear 1s forwards;
          animation: appear 1s forwards;
  -webkit-animation-timing-function: ease;
          animation-timing-function: ease;
  -webkit-animation-delay: 0.2s;
          animation-delay: 0.2s;
}

@-webkit-keyframes appear {
  from {
    border-radius: 15%;
    opacity: 0;
  }
  to {
    border-radius: 0%;
    opacity: 1;
  }
}

@keyframes appear {
  from {
    border-radius: 15%;
    opacity: 0;
  }
  to {
    border-radius: 0%;
    opacity: 1;
  }
}
@-webkit-keyframes disappear {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes disappear {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}/*# sourceMappingURL=style.css.map */
</style> 