<template>
  <div class="message" :style="{ direction: dir }">
    <div class="time">
      <span v-if="time">{{ formatDate(time) }}</span>
    </div>
    <div class="avator">
      <img :src="avator" alt="" srcset="" />
    </div>
    <div :class="textClass" class="text">{{ text }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatDate } from '../utils/index';

const props = defineProps({
  avator: {
    type: String,
    required: true
  },
  text: [String, Number],
  time: {
    default: ''
  },
  directionRight: {
    type: Boolean,
    default: true
  }
})
const dir = computed(() => (props.directionRight ? 'rtl' : ''))
const textClass = computed(() =>
  props.directionRight ? 'rightText' : 'leftText'
)
</script>

<style scoped lang="scss">
.message {
  width: 100%;
  min-height: 50px;
  margin-top: 1.40rem;
  * {
    display: inline-block;
    vertical-align: top;
  }
  .time {
    display: block;
    text-align: center;
    span {
      font-family: PingFangSC-Regular;
      font-size: 0.75rem;
      color: rgba(39, 40, 50, 0.3);
      letter-spacing: -0.41px;
      font-weight: 400;
    }
  }
  .avator {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.63rem;
    background-color: rgb(218, 159, 83);
    margin: 0 0.63rem;
    img{
      width: 2.5rem;
      height: 2.5rem;
    }
  }
  .text {
    padding: 0.5rem;
    max-width: 14rem;
    font-family: PingFangSC-Regular;
    font-size: 1rem;
    color: #272832;
    font-weight: 400;
  }
  .rightText {
    background: #ffe431;
    border-radius: 0.63rem 0 0.63rem 0.63rem;
    text-align: left;
  }
  .leftText {
    background: #ffffff;
    border-radius: 0 0.63rem 0.63rem;
  }
}
</style>
