<template>
    <div>
        <div class="head" :style="{
            position: position
        }">
            <i class="iconfont icon-fanhui" @click="back"></i>
            <span>{{ title || '' }}</span>
            <img :src="PORT + userInfo.user_pic" alt="" srcset="" :style="{ visibility: img ? 'visible' : 'hidden' }" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { PORT } from '../HttpConfig';
import { reactive, defineEmits } from 'vue'
interface UserInfo {
    id: number
    account: string
    password: string
    nickname: string
    user_pic: string
}

const props = defineProps(["title", "callback", "position", "img"])

const currentUser: UserInfo = JSON.parse(localStorage.getItem('user') as string) as UserInfo
let userInfo = reactive(currentUser)

let back = () => {
    history.go(-1)
}
if (props.callback) {
    back = props.callback
}

</script>

<style scoped lang="scss">
.head {
    background: #fff;
    overflow: hidden;
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3.5rem;
    width: 100%;
    box-sizing: border-box;
    padding: 0 0.75rem;
    font-size: 1.25rem;
    color: #272832;
    letter-spacing: -0.69px;
    font-weight: 400;
    box-shadow: 0px 0.5px 0px 0px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #e4e4e4;

    i {
        font-size: 29px;
    }

    img {
        width: 2.8rem;
        height: 2.8rem;
        border-radius: 0.65rem;
        line-height: 44px;
    }
}
</style>