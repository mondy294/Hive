<template>
  <div class="app">
    <router-view></router-view>
    <TabBar v-show="route.meta.show"></TabBar>
  </div>
</template>

<script setup lang="ts">
import TabBar from './components/TabBar.vue'
import { useRoute } from 'vue-router';
const route = useRoute()

</script>

<style lang="scss" scoped>
.app {
  width: 100%;
  height: 100%;
}
</style>
