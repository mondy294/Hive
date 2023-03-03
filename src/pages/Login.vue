<template>
  <div class="box">
    <header class="header">
      <span class="shut iconfont">&#xe65a;</span>
      <span class="register" @click="realChange">
        <span v-show="show">注册</span>
        <span v-show="!show">登录</span>
      </span>
    </header>

    <transition
      name="animate__animated animate__bounce"
      enter-active-class="animate__fadeInLeft"
      leave-active-class="animate__fadeOutLeft"
    >
      <LoginComponent v-show="show" key="1"></LoginComponent>
    </transition>
    <transition
      name="animate__animated animate__bounce"
      enter-active-class="animate__fadeInRight"
      leave-active-class="animate__fadeOutRight"
    >
      <RegisterComponent v-show="!show" key="2"></RegisterComponent>
    </transition>
  </div>
</template>

<script setup lang="ts">
import LoginComponent from '../components/LoginComponent.vue'
import RegisterComponent from '../components/RegisterComponent.vue'
import { ref } from 'vue'

let show = ref(true)

// 节流
function throttle(fn: Function, wait: Number) {
  let timer = 0
  return () => {
    let now = Date.now()
    if (now - timer > wait) {
      fn()
      timer = Date.now()
    }
  }
}

function change(): void {
  show.value = !show.value
}
const realChange = throttle(change, 1000)
</script>

<style lang="scss" scoped>
.box{
    overflow: hidden;
    width: 100%;
    height: 100vh;
}
.header {
  padding: 0.79rem 1.97rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 2.75rem;
  box-sizing: border-box;

  .shut {
    width: 1.05rem;
    height: 1.05rem;
    font-weight: 700;
  }

  .register {
    width: 2.3rem;
    height: 1.56rem;
    line-height: 1.56rem;
    font-family: PingFangSC-Medium;
    font-size: 1.13rem;
    color: #333333;
    letter-spacing: 0;
    font-weight: 700;
  }
}
</style>
