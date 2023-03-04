<template>
    <div class="tabbar">
        <div class="tab-item" @click="toTabBar('/home')">
            <img src="../assets/images/mini-images/聊天@3x.png" alt="">
            <span>聊天</span>
        </div>
        <div class="tab-item" @click="toTabBar('')">
            <img src="../assets/images/mini-images/Group 4@3x.png" alt="">
            <span>Hive</span>
        </div>
        <div class="tab-item">
            <img src="../assets/images/mini-images/Group 4@3x.png" alt="">
            <span>未来</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
function toTabBar(path: string) {
    router.push(path)
}
</script>

<style lang="scss" scoped>
.tabbar {
    position: fixed;
    display: flex;
    justify-content: space-around;
    align-items: center;
    bottom: 0px;
    width: 100%;
    height: 3.25rem;
    background-color: rgba(250, 250, 250);
    box-shadow: inset 0px 0.5px 0px 0px rgba(0, 0, 0, 0.1);

    .tab-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
            width: 1.75rem;
            height: 1.75rem;
        }

        span {
            text-align: center;
            width: 1.8rem;
            height: 0.88rem;
            font-family: PingFangSC-Regular;
            font-size: 0.63rem;
            color: #272832;
            letter-spacing: -0.34px;
            font-weight: 400;
        }
    }
}
</style>