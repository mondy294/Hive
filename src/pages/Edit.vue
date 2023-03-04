<template>
    <Header :title="userInfo.nickname" position="relative" :img="false"></Header>
    <input type="file" :style="{ display: 'none' }" ref="getfile" @change="toCut">
    <div class="contianer" v-show="!show">
        <div class="area">
            <div class="options" @click="chooseFile">
                <span>头像</span>
                <i class="iconfont">&#xe603;</i>
            </div>
            <div class="options noline">
                <span>签名</span>
                <i class="iconfont">&#xe603;</i>
            </div>
        </div>

        <div class="area">
            <div class="options">
                <span>昵称</span>
                <i class="iconfont">&#xe603;</i>
            </div>
            <div class="options">
                <span>性别</span>
                <i class="iconfont">&#xe603;</i>
            </div>
            <div class="noline options">
                <span>生日</span>
                <i class="iconfont">&#xe603;</i>
            </div>
        </div>
    </div>
    <Cut v-show="show" :imgurl="imgurl"></Cut>
</template>

<script setup lang="ts">
import Header from '../components/Header.vue';
import { onMounted, ref, reactive } from 'vue';
import Cut from '../components/Cut.vue';
import { useRouter } from 'vue-router'
import { PORT } from '../HttpConfig';
import axios from 'axios';

interface UserInfo {
    id: number
    account: string
    password: string
    nickname: string
    user_pic: string
}

const router = useRouter()
const currentUser: UserInfo = JSON.parse(localStorage.getItem('user') as string) as UserInfo
const token = localStorage.getItem('token')
let userInfo = reactive(currentUser)

let show = ref(false)
const getfile = ref()
let imgurl = ref<any>('')
function chooseFile() {
    getfile.value.click()
}
async function toCut() {
    const file = getfile.value.files[0]
    let formdata = new FormData()
    formdata.append('file', file)
    formdata.append(
        "json",
        new Blob(
            [
                JSON.stringify(userInfo),
            ],
            { type: "application/json" }
        )
    );
    let res = await axios.post(`${PORT}api/updateAvator`, formdata, {
        headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data'
        }
    })
    if (res.data.status == 0) {
        console.log(res.data.data);
        localStorage.setItem('user', JSON.stringify(res.data.data))
        userInfo.user_pic = res.data.data.user_pic
    }


    // let reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = async function (e) {
    //     imgurl.value = reader.result;
    //     // let res = await updateAvator({ imgurl: imgurl.value, id: userInfo.id })
    //     // console.log(res);

    //     // 头像裁剪 有空再写
    //     show.value = !show.value
    // };



}
</script>

<style scoped lang="scss">
.contianer {
    box-sizing: border-box;
    padding: 0 15px;
    width: 100%;
    height: 100%;
    padding-top: 10px;
    background-color: #f6f6f6;

    .options {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 50px;
        border-bottom: 1px solid rgba(0, 0, 0, .1);
    }

    .area {
        box-sizing: border-box;
        margin-top: 10px;
        width: 100%;
        padding: 0 10px;
        border-radius: 10px;
        background-color: #fff;

    }

    span {
        font-size: 1rem;
    }

    i {
        font-size: 12px;
    }



    .noline {
        border: 0;
    }
}
</style>