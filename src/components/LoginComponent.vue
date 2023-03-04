<template>
    <main class="main" v-loading="loading">
        <div class="logo"></div>
        <div class="container">
            <h1>登录</h1>
            <span class="hello">您好，欢迎来到蜂巢!</span>
            <input type="text" class="account" placeholder="请输入您的账号" v-model="account">
            <input type="password" class="password" placeholder="请输入密码" v-model="password">

        </div>
        <button class="login" @click="login">登录</button>


    </main>
</template>

<script setup lang="ts">

import { Login } from '../api/index'
import { ref } from 'vue'
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router'

const router = useRouter()
let account = ref('')
let password = ref('')
let loading = ref(false)

const blank = () => {

    ElMessage.error('账号或密码未填写')
}
async function login() {

    if (!account.value || !password.value) {
        blank()
        return
    }
    const userInfo = {
        account,
        password
    }
    loading.value = true
    let res = await Login(userInfo)

    if (res.data.status == 0) {
        loading.value = false
        account.value = ''
        password.value = ''
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', JSON.stringify(res.data.user))
        router.push('/home')
    } else {
        setTimeout(() => {
            loading.value = false
        }, 700);
    }
}



</script>

<style lang="scss" scoped>
.main {
    position: absolute;

    input {
        outline: none;
    }

    .logo {
        margin: 0 auto;
        margin-top: 2.5rem;
        width: 6rem;
        height: 2.86rem;
        background-image: url('../assets/images/mini-images/火@3x.png');
        background-size: cover;
    }

    .container {
        box-sizing: border-box;
        padding: 0 1.81rem;
        width: 100%;

        margin-top: 1.7rem;

        h1 {
            width: 3.5rem;
            height: 2.5rem;
            line-height: 2.5rem;
            font-family: PingFangSC-Medium;
            font-size: 1.75rem;
            color: #272832;
            letter-spacing: 0;
            font-weight: 500;
        }

        .hello {
            width: 12.75rem;
            height: 1.75rem;
            line-height: 1.75rem;
            font-family: PingFangSC-Regular;
            font-size: 1.25rem;
            color: rgba(39, 40, 50, 0.50);
            letter-spacing: 0;
            font-weight: 400;
        }

        .account {
            margin-top: 2rem;
            height: 2.12rem;
            width: 100%;
            border: 0px;
            border-bottom: 0.06rem solid #b7b7b9;
        }

        .password {
            margin-top: 2rem;
            height: 2.12rem;
            width: 100%;
            border: 0px;
            border-bottom: 0.06rem solid #b7b7b9;
        }

    }

    .login {
        display: block;
        margin: 0 auto;
        margin-top: 6.2rem;
        border: 0px;
        width: 16.25rem;
        height: 3rem;
        background: #FFE431;
        box-shadow: 0rem 1.56rem 1rem -1.12rem rgba(255, 228, 49, 0.4);
        border-radius: 1.5rem;
    }
}
</style>