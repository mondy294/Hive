import { RouteRecord, RouteRecordRaw, RouterOptions } from "vue-router"
import Home from "../pages/Home.vue";
import Chat from "../pages/Chat.vue";
import Login from "../pages/Login.vue";
import Friends from '../pages/Friends.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home,
    },
    {
        path: '/chat',
        component: Chat
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/friends',
        component: Friends,
    }
]


export default routes