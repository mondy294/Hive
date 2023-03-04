<template>
    <div class="box" v-dialogDrag="true">
        <div class="dialog_content">
            <div class="dialog_header"></div>
        </div>
        <canvas id="canvas" ref="canvas" width="300" height="300"></canvas>
    </div>
</template>

<script setup lang="ts">

defineProps(["imgurl"])
</script>

<style scoped lang="scss">
.box {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    width: 300px;
    height: 300px;


    .dialog_content {
        position: absolute;
        width: 100px;
        height: 100px;
        background-color: rgba(0, 0, 0, 0.3);
        cursor: crosshair;

        .dialog_header {
            width: 100px;
            height: 100px;
        }
    }
}
</style>