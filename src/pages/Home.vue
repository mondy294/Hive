<template>
    <div class="home">
        <header class="header">
            <div class="avator" @click="setting">
                <img :src="PORT + userInfo.user_pic">
            </div>
            <div class="logo"></div>
            <div class="functions">
                <div class="search"></div>
                <div class="add"></div>
            </div>
        </header>
        <main class="main">
            <div class="msg-item" v-for="(item, index) in friendsList" :key="item.id" @click="goChat(item)">
                <span class="msg-avator">
                    <img :src="PORT + item.user_pic" alt="">
                </span>
                <div class="msg-box">
                    <div class="up">
                        <span class="name">{{ item.nickname }}</span>
                        <span class="time">{{ formatDate(item.lastChatInfo?.time) }}</span>
                    </div>
                    <div class="down">
                        <span class="hello">{{ item.lastChatInfo?.text }}</span>
                    </div>
                </div>
                <div v-if="item.catchInfo?.length" class="circle">{{ item.catchInfo.length }}</div>
            </div>
        </main>
    </div>
    <el-drawer class="drawer" v-model="drawer" :with-header="false" :z-index="0" :direction="LTR" :before-close="willClose"
        :show-close="false" size="300">
        <div class="box">
            <div class="mainarea">
                <div class="black"></div>
                <div class="mask" :style="{ backgroundImage: 'url(' + PORT + userInfo.user_pic + ')' }"></div>
                <div class="showInfo">
                    <div class="avator">
                        <img :src="PORT + userInfo.user_pic">
                    </div>
                    <div class="main-message">
                        <span class="nickname">{{ userInfo.nickname }}</span>
                        <span class="user-label"> 这个人很懒，什么都没有留下 </span>
                    </div>
                </div>

            </div>
            <div class="setting" v-for="({ logo, name }, index) in settings" :key="name" @click="gosetting(name)">
                <div class="left">
                    <div class="icon iconfont" :class="logo"></div>
                    <div class="settingName">{{ name }}</div>
                </div>
                <div class="right iconfont">&#xe603;</div>
            </div>
            <div class="bottom">
                <div class="gear">
                    <span class="iconfont">&#xe646;</span>
                    <i>设置</i>
                </div>
                <div class="night">
                    <span class="iconfont">&#xe611;</span>
                    <i>夜间</i>
                </div>
            </div>
        </div>
    </el-drawer>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import { onMounted, ref, reactive, onBeforeMount, onBeforeUnmount } from 'vue';
import { LTR, RTL } from 'element-plus/es/components/virtual-list/src/defaults';
import { PORT } from '../HttpConfig'
import { getFriendsList } from '../api/index'
import websocketConfig from '../config/websocket'
import { formatDate } from '../utils/index';
import createWebsocket from '../api/websocket';



interface UserInfo {
    id: number
    account: string
    password: string
    nickname: string
    user_pic: string
}

const socket = createWebsocket()
const { LOGIN, USER_IN_ROOM, USER_LEAVE_ROOM, MESSAGE } = websocketConfig
socket.addEventListener('open', () => {
    socket.send(JSON.stringify({ id: currentUser.id, type: LOGIN }))
    socket.addEventListener('message', (e) => {
        const data = JSON.parse(e.data)
        friendsList.forEach(item => {
            if (item.id == data.sender) {
                item.lastChatInfo.time = data.time
                item.lastChatInfo.text = data.message
                item.catchInfo.push({ ...data, avator: item.user_pic, directionRight: false, text: data.message })
                return
            }
        })
    })
})

// localStorage.clear()

const currentUser: UserInfo = JSON.parse(localStorage.getItem('user') as string) as UserInfo

let userInfo = reactive(currentUser)
const router = useRouter()
let drawer = ref(false)
let friendsList = reactive([] as any)

onBeforeMount(async () => {
    await getFriends()
    friendsList.forEach(item => {
        const chatListStr = localStorage.getItem(`${currentUser.id}&${item.id}`)
        item.catchInfo = []
        if (chatListStr !== '[]' && chatListStr) {
            const chatData = JSON.parse(chatListStr)
            item.lastChatInfo = chatData[chatData.length - 1]
        } else {
            item.lastChatInfo = { time: Date.now(), text: '还未发送过消息' }
        }
    })
})
onBeforeUnmount(() => {
    friendsList.forEach(item => {
        if (item.catchInfo.length !== 0) {
            const chatListStr = localStorage.getItem(`${currentUser.id}&${item.id}`)
            const newChatStr = JSON.parse(chatListStr as string)
            if (chatListStr && chatListStr.length !== 0) {
                newChatStr.push(...item.catchInfo)
                localStorage.setItem(`${currentUser.id}&${item.id}`, JSON.stringify(newChatStr))
            } else {
                localStorage.setItem(`${currentUser.id}&${item.id}`, JSON.stringify(item.catchInfo))

            }
        }
    })
})

const settings = [
    {
        name: '直播',
        logo: 'icon-zhibo'
    },
    {
        name: '编辑信息',
        logo: 'icon-bianji'
    },
    {
        name: '退出登录',
        logo: 'icon-tuichu'
    },
    {
        name: '我的图片',
        logo: 'icon-tupian'
    }
]


async function getFriends() {
    let res = await getFriendsList({ id: userInfo.id })
    if (res.data.status == 0) {
        friendsList.push(...res.data.list as object[])
    }
}

onMounted(() => {

})
function toLogin() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
}
function toEdit() {
    router.push('/edit')
}
function gosetting(name: string) {
    switch (name) {
        case "退出登录":
            toLogin()
            break
        case "编辑信息":
            toEdit()

    }
}

function willClose(done: Function) {
    drawer.value = false
    done()

}
function setting() {
    drawer.value = true
}
const goChat = (userInfo) => {
    router.push({
        name: 'chat',
        query: { ...userInfo }
    })
}
</script>

<style lang="scss" scoped>
.home {
    padding-top: 2.75rem;
    padding-bottom: 3.25rem;

    overflow: -moz-scrollbars-none
}

.header {
    position: fixed;
    top: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 2.75rem;
    background: #FFFFFF;
    box-shadow: 0rem 0.03rem 0rem 0rem rgba(0, 0, 0, 0.1);

    .avator {
        width: 2.13rem;
        height: 2.13rem;
        margin-left: 1rem;
        border-radius: 0.5rem;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;

        }
    }

    .logo {
        width: 2.75rem;
        height: 1.31rem;
        background-image: url('../assets/images/mini-images/火@3x.png');
        background-size: cover;
    }

    .functions {
        position: relative;
        display: flex;
        align-items: center;
        margin-right: 1rem;

        .search {
            position: absolute;
            width: 1.63rem;
            height: 1.63rem;
            margin-left: -3rem;
            background-image: url('../assets/images/mini-images/search.png');
            background-size: cover;
        }

        .add {
            width: 1.5rem;
            height: 1.5rem;
            background-image: url('../assets/images/mini-images/addgroup.png');
        }
    }


}

.main {

    .msg-item {
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        padding-right: 1rem;
        width: 100%;
        height: 5rem;
        background-color: #FFFFFF;
        overflow: hidden;


        .circle {
            position: absolute;
            right: 1rem;
            background-color: red;
            color: white;
            border-radius: 50%;
            width: 1rem;
            height: 1rem;
            text-align: center;
            line-height: 1rem;
        }

        .msg-avator {
            width: 3rem;
            height: 3rem;
            background: #FFE431;
            border-radius: 0.75rem;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .msg-box {
            width: 17.5rem;
            height: 100%;
            // margin-left: 1rem;

            .up {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                height: 50%;

                .name {
                    width: 4.38rem;
                    height: 1.06rem;
                    line-height: 1.06rem;
                    font-family: PingFangSC-Regular;
                    font-size: 1.13rem;
                    color: #272832;
                    letter-spacing: -0.62px;
                    font-weight: 400;
                }

                .time {
                    width: 2.88rem;
                    height: 1.06rem;
                    font-family: PingFangSC-Regular;
                    font-size: 0.75rem;
                    color: rgba(39, 40, 50, 0.40);
                    letter-spacing: -0.41px;
                    font-weight: 400;
                }
            }

            .down {
                display: flex;
                align-items: center;
                width: 100%;
                height: 50%;

                .hello {
                    width: 11rem;
                    height: 1.25rem;
                    line-height: 1.25rem;
                    font-family: PingFangSC-Regular;
                    font-size: 0.88rem;
                    color: rgba(39, 40, 50, 0.60);
                    letter-spacing: -0.48px;
                    font-weight: 400;
                }
            }
        }
    }
}

.drawer {
    position: relative;
    background-color: #FFE431;
    // overflow: hidden;

    .box {
        box-sizing: border-box;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 300px;
        height: 100%;
        margin-top: -20px;
        background-color: fff;
        z-index: 1;

        .mainarea {
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            height: 150px;

            .black {
                position: absolute;
                width: 100%;
                height: 100%;
                z-index: 1;
                background-color: rgba(0, 0, 0, .2);
            }

            .mask {
                position: absolute;
                width: 100%;
                height: 100%;
                background-repeat: no-repeat;
                background-position: center;
                background-size: cover;
                filter: blur(1.5px);
            }

            .showInfo {
                position: absolute;
                z-index: 20;
                box-sizing: border-box;
                padding: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                bottom: 0px;
                width: 100%;
                height: 100px;

                .avator {
                    box-sizing: border-box;
                    width: 80px;
                    height: 80px;
                    border-radius: 40px;
                    border: 2px solid white;
                    overflow: hidden;
                    z-index: 2;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .main-message {
                    width: 180px;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: start;

                    .nickname {
                        width: 100%;
                        height: 30px;
                        font-size: 24px;
                        line-height: 30px;
                        font-weight: 700;
                        color: white;
                    }

                    .user-label {
                        width: 100%;
                        height: 30px;
                        line-height: 30px;
                        font-size: 12px;
                        color: white;
                    }
                }
            }
        }
    }
}

.box {
    .setting {
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        width: 100%;
        height: 65px;

        .left {
            display: flex;
            justify-content: start;
            width: 80%;
            height: 100%;

            .icon {
                text-align: center;
                line-height: 45px;
                font-size: 24px;
                // color: #ffea5f;
                width: 20%;
                height: 100%;
            }

            .settingName {
                width: 80%;
                height: 100%;
                line-height: 45px;
                color: black;
                margin-left: 10px;
            }
        }

        .right {
            text-align: right;
            line-height: 45px;
            font-size: 14px;
            width: 40px;
            height: 100%;

        }
    }

    .bottom {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        justify-content: start;
        padding: 5px 15px;
        position: absolute;
        width: 100%;
        height: 65px;
        bottom: 0px;

        .gear {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            width: 45px;
            height: 45px;

            span {
                font-size: 24px;
            }

            i {
                font-size: 14px;
            }

        }

        .night {
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            width: 45px;
            height: 45px;

            span {
                font-size: 24px;
            }

            i {
                font-size: 14px;
            }
        }
    }
}
</style>