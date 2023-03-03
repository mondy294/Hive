<template>
    <div class="home">
        <header class="header">
            <div class="avator"></div>
            <div class="logo"></div>
            <div class="functions">
                <div class="search"></div>
                <div class="add"></div>
            </div>
        </header>
        <main class="main">
            <div class="msg-item">
                <span class="msg-avator"></span>
                <div class="msg-box">
                    <div class="up">
                        <span class="name">好友请求</span>
                        <span class="time">上午7:45</span>
                    </div>
                    <div class="down">
                        <span class="hello">你好，我是你的新朋友</span>
                    </div>
                </div>
            </div>
            <div class="msg-item">
                <span class="msg-avator"></span>
                <div class="msg-box">
                    <div class="up">
                        <span class="name">好友请求</span>
                        <span class="time">上午7:45</span>
                    </div>
                    <div class="down">
                        <span class="hello">你好，我是你的新朋友</span>
                    </div>
                </div>
            </div>
            <div class="msg-item">
                <span class="msg-avator"></span>
                <div class="msg-box">
                    <div class="up">
                        <span class="name">好友请求</span>
                        <span class="time">上午7:45</span>
                    </div>
                    <div class="down">
                        <span class="hello">你好，我是你的新朋友</span>
                    </div>
                </div>
            </div>
            <div class="msg-item">
                <span class="msg-avator"></span>
                <div class="msg-box">
                    <div class="up">
                        <span class="name">好友请求</span>
                        <span class="time">上午7:45</span>
                    </div>
                    <div class="down">
                        <span class="hello">你好，我是你的新朋友</span>
                    </div>
                </div>
            </div>
            <div class="msg-item">
                <span class="msg-avator"></span>
                <div class="msg-box">
                    <div class="up">
                        <span class="name">好友请求</span>
                        <span class="time">上午7:45</span>
                    </div>
                    <div class="down">
                        <span class="hello">你好，我是你的新朋友</span>
                    </div>
                </div>
            </div>
            <div class="msg-item">
                <span class="msg-avator"></span>
                <div class="msg-box">
                    <div class="up">
                        <span class="name">好友请求</span>
                        <span class="time">上午7:45</span>
                    </div>
                    <div class="down">
                        <span class="hello">你好，我是你的新朋友</span>
                    </div>
                </div>
            </div>
            <div class="msg-item">
                <span class="msg-avator"></span>
                <div class="msg-box">
                    <div class="up">
                        <span class="name">好友请求</span>
                        <span class="time">上午7:45</span>
                    </div>
                    <div class="down">
                        <span class="hello">你好，我是你的新朋友</span>
                    </div>
                </div>
            </div>
            <div class="msg-item">
                <span class="msg-avator"></span>
                <div class="msg-box">
                    <div class="up">
                        <span class="name">好友请求</span>
                        <span class="time">上午7:45</span>
                    </div>
                    <div class="down">
                        <span class="hello">你好，我是你的新朋友</span>
                    </div>
                </div>
            </div>
            <div class="msg-item">
                <span class="msg-avator"></span>
                <div class="msg-box">
                    <div class="up">
                        <span class="name">好友请求</span>
                        <span class="time">上午7:45</span>
                    </div>
                    <div class="down">
                        <span class="hello">你好，我是你的新朋友</span>
                    </div>
                </div>
            </div>
            <div class="msg-item">
                <span class="msg-avator"></span>
                <div class="msg-box">
                    <div class="up">
                        <span class="name">好友请求</span>
                        <span class="time">上午7:45</span>
                    </div>
                    <div class="down">
                        <span class="hello">你好，我是你的新朋友</span>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">

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
        background-color: red;
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
            background-image: url('../assets/images/mini-images/add group.png');
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

        .msg-avator {
            width: 3rem;
            height: 3rem;
            background: #FFE431;
            border-radius: 0.75rem;
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
</style>