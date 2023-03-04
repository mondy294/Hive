<template>
  <div @click.capture="hiddenEmoji" :style="{ height: height + 'px' }" id="container">
    <div class="head">
      <i @click="outMessage" class="iconfont icon-fanhui"></i>
      <span>开心就好</span>
      <img src="../assets/images/mini-images/add group.png" alt="" srcset="" />
    </div>
    <div class="messageBox" ref="messageBox">
      <div class="messageList">
        <Message v-for="({ avator, directionRight, time, text }, index) in messageList" :avator="avator"
          :direction-right="directionRight" :time="time" :text="text" />
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
import { ref, reactive, onMounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import Message from './Message.vue'

const router = useRouter()
const route = useRoute()
// console.log(route.meta);

const messageList = reactive([
  {
    avator: '../assets/images/mini-images/Group 4.png',
    text: '开发的，啥可大可久',
    directionRight: false,
    time: ''
  },
  {
    avator: '../assets/images/mini-images/Group 4.png',
    text: '开发的，啥可大可久多久多久的开发上课地方，是的开发绿色健康。上课地方叫来，都看见。的开发上课地方，是的开发绿色健康。上课地方叫来，都看见。',
    directionRight: true,
    time: '11月14日 14:23'
  },
  {
    avator: '../assets/images/mini-images/Group 4.png',
    text: '开发的，啥可大可久多久的开发上课地方，是的开发绿色健康。上课地方叫来，都看见。',
    directionRight: true,
    time: ''
  },
  {
    avator: '../assets/images/mini-images/Group 4.png',
    text: '开发的，啥可大可久多久的开发上课地方，是的开发绿色健康。上课地方叫来，都看见。',
    directionRight: false,
    time: ''
  },
  {
    avator: '../assets/images/mini-images/Group 4.png',
    text: '开发的，啥可大可久多久的开发上课地方，是的开发绿色健康。上课地方叫来，都看见。',
    directionRight: false,
    time: '11月14日 14:23'
  },
  {
    avator: '../assets/images/mini-images/Group 4.png',
    text: '开发的，啥可大可久多久的开发上课地方，是的开发绿色健康。上课地方叫来，都看见。',
    directionRight: false,
    time: ''
  },
  {
    avator: '../assets/images/mini-images/Group 4.png',
    text: '开发的，啥可大可久多久的开发上课地方，是的开发绿色健康。上课地方叫来，都看见。',
    directionRight: true,
    time: ''
  },
  {
    avator: '../assets/images/mini-images/Group 4.png',
    text: '开发的，啥可大可久',
    directionRight: false,
    time: ''
  },
  {
    avator: '../assets/images/mini-images/Group 4.png',
    text: '开发的，啥可大可久多久多久的开发上课地方，是的开发绿色健康。上课地方叫来，都看见。的开发上课地方，是的开发绿色健康。上课地方叫来，都看见。',
    directionRight: true,
    time: '11月14日 14:23'
  },
  {
    avator: '../assets/images/mini-images/Group 4.png',
    text: '开发的，啥可大可久多久的开发上课地方，是的开发绿色健康。上课地方叫来，都看见。',
    directionRight: true,
    time: ''
  },
  {
    avator: '../assets/images/mini-images/Group 4.png',
    text: '开发的，啥可大可久多久的开发上课地方，是的开发绿色健康。上课地方叫来，都看见。',
    directionRight: false,
    time: ''
  },
  {
    avator: '../assets/images/mini-images/Group 4.png',
    text: '开发的，啥可大可久多久的开发上课地方，是的开发绿色健康。上课地方叫来，都看见。',
    directionRight: false,
    time: '11月14日 14:23'
  },
  {
    avator: '../assets/images/mini-images/Group 4.png',
    text: '开发的，啥可大可久多久的开发上课地方，是的开发绿色健康。上课地方叫来，都看见。',
    directionRight: false,
    time: ''
  },
  {
    avator: '../assets/images/mini-images/Group 4.png',
    text: '开发的，啥可大可久多久的开发上课地方，是的开发绿色健康。上课地方叫来，都看见。',
    directionRight: true,
    time: ''
  }
])
const emojiList = ['😀', '😉', '😁', '😆', '😅', '😂', '🤣', '😊', '🙂', '😄', '🙃', '😇', '😃', '😚', '🥰', '😍', '🤔', '😘', '🤭', '🤫', '😐', '😶', '🤨', '😬', '😏', '😒', '🙄', '🤐', '🤥', '😪', '😌', '🤤']
let height = ref(document.documentElement.clientHeight)

const formSub = ref()
const addMessage = () => {
  if (!inputValue.value) return
  messageList.push({
    avator: '../assets/images/mini-images/Group 4.png',
    text: inputValue.value,
    directionRight: true,
    time: ''
  })
  inputValue.value = ''
  nextTick(focusHandle)
}
const messageBox = ref()
const focusInp = ref('')
const focusHandle = () => {
  const box = messageBox.value
  box.scrollTop = box.firstElementChild.offsetHeight
  focusInp.value = 'focusInp'
}
const blurHandle = () => {
  focusInp.value = ''
}
const outMessage = () => router.push('/home')
onMounted(() => {
  document.addEventListener('resize', () => {
    height.value = document.body.clientHeight
  })
})
const inputValue = ref('')
const emojiShow = ref('')
const showEmoji = () => emojiShow.value = 'emojiShow'
const hiddenEmoji = () => emojiShow.value = ''
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
