<template>
  <div @pointerdown.capture="hiddenEmoji" :style="{ height: height + 'px' }" id="container">
    <div class="head">
      <i @click="outMessage" class="iconfont icon-fanhui"></i>
      <span>{{ userInfo.nickname }}</span>
      <img :src="PORT + userInfo.user_pic" alt="" srcset="" />
    </div>
    <div class="messageBox" ref="messageBox">
      <div class="messageList">
        <Message v-for="({ avator, directionRight, time, text }, index) in messageList" :avator="PORT + avator"
          :direction-right="directionRight" :time="calculateTime(time, index)" :text="text" />
      </div>
    </div>
    <div class="bottomInp" :class="focusInp">
      <img src="../assets/images/mini-images/语音.png" alt="" />
      <form ref="formSub" @submit.prevent="addMessage" action=""><input v-model="inputValue" @focus="focusHandle"
          @blur="blurHandle" type="text" /></form>
      <img @pointerdown="showEmoji" src="../assets/images/mini-images/表情.png" alt="" />
      <img src="../assets/images/mini-images/add group.png" alt="" />
    </div>
    <div class="emoji" :class="emojiShow">
      <span v-for="(emoji, index) in emojiList" @pointerdown="addEmoji(index)">{{ emoji }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref, reactive, onMounted, nextTick, onBeforeMount, onBeforeUnmount, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import Message from './Message.vue'
import websocketConfig from '../config/websocket'
import createWebsocket from '../api/websocket';
import { PORT } from '../HttpConfig'


interface UserInfo {
  id: number
  account: string
  password: string
  nickname: string
  user_pic: string
}

const router = useRouter()
const route = useRoute()
const userInfo = reactive({} as UserInfo)
const messageList = reactive([] as any)
const emojiList = ['😀', '😉', '😁', '😆', '😅', '😂', '🤣', '😊', '🙂', '😄', '🙃', '😇', '😃', '😚', '🥰', '😍', '🤔', '😘', '🤭', '🤫', '😐', '😶', '🤨', '😬', '😏', '😒', '🙄', '🤐', '🤥', '😪', '😌', '🤤']
let height = ref(document.documentElement.clientHeight)
const formSub = ref()
const messageBox = ref()
const focusInp = ref('')
const inputValue = ref('')
const emojiShow = ref('')
const showEmoji = () => emojiShow.value = 'emojiShow'
const hiddenEmoji = () => emojiShow.value = ''
const socket = createWebsocket()
const currentUser: UserInfo = JSON.parse(localStorage.getItem('user') as string) as UserInfo


const { LOGIN, USER_IN_ROOM, USER_LEAVE_ROOM, MESSAGE } = websocketConfig
socket.addEventListener('open', () => {
  socket.send(JSON.stringify({ id: currentUser.id, type: LOGIN }))
  socket.addEventListener('message', (e) => {
    const data = JSON.parse(e.data)
    const dir = data.sender === currentUser.id
    const userAvator = dir ? currentUser.user_pic : userInfo.user_pic
    messageList.push({
      avator: userAvator,
      text: data.message,
      directionRight: dir,
      time: Date.now()
    })
    focusHandle()
  })
})


const addMessage = () => {
  if (!inputValue.value) return
  socket.send(JSON.stringify({
    sender: currentUser.id,
    receiver: userInfo.id,
    message: inputValue.value,
    time: Date.now(),
    type: MESSAGE
  }))
  inputValue.value = ''
  nextTick(focusHandle)
}

const focusHandle = () => {
  const box = messageBox.value
  box.scrollTop = box.firstElementChild.offsetHeight
  focusInp.value = 'focusInp'
}
const blurHandle = () => {
  focusInp.value = ''
}
const outMessage = () => router.push('/home')
const calculateTime = (time, index) => {
  if (index > 0) {
    return +time - +messageList[index - 1].time > 3e5 ? time : ''
  }
  return time
}

onBeforeMount(() => {
  Object.assign(userInfo, route.query)
  const lastChat = localStorage.getItem(`${currentUser.id}&${userInfo.id}`)
  if (lastChat) {
    Object.assign(messageList, JSON.parse(lastChat))
  }
})
onBeforeUnmount(() => {
  localStorage.setItem(`${currentUser.id}&${userInfo.id}`, JSON.stringify(messageList))
  socket.close()
})


const addEmoji = (index: number) => {
  inputValue.value += emojiList[index]
  emojiShow.value = 'emojiShow'
}
</script>

<style lang="scss" scoped>
#container {
  position: relative;
  background: #f4f4f4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.head {
  background: #f4f4f4;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
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
    width: 29px;
    height: 29px;
    border-radius: 4px;
    line-height: 44px;
  }
}

.bottomInp {
  background: #f4f4f4;
  display: flex;
  bottom: 0;
  position: fixed;
  justify-content: space-around;
  align-items: center;
  height: 3rem;
  width: 100%;
  box-sizing: border-box;
  font-weight: 400;
  box-shadow: 0px 0.5px 0px 0px rgba(0, 0, 0, 0.1);
  border-top: 1px solid #e4e4e4;
  padding: 7px;

  input {
    width: 14.19rem;
    height: 2.25rem;
    background: #ffffff;
    border-radius: 0.31rem;
    border: none;
    outline: none;
    padding-left: 0.5rem;
  }

  img {
    width: 1.75rem;
    height: 1.75rem;
  }

  .emoji {
    width: 100%;
  }
}

.focuInp {
  bottom: 0;
  position: fixed;
}

.emoji {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0.7rem;
  min-height: 7rem;
  display: none;

  span {
    width: 1.5rem;
    height: 1.5rem;
    text-align: center;
    line-height: 1.5rem;
  }
}

.emojiShow {
  display: flex;
}

.messageBox {
  overflow: auto;
  flex-grow: 1;
  margin: 3rem 0;

  // margin-top: 3rem;
  .messageList {
    padding-bottom: 1.5rem;
  }
}
</style>
