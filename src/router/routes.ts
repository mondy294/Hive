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
        meta:{
            show:true
        }
    },
    {
        path: '/chat',
        name:'chat',
        component: Chat,
        meta:{
            show:false
        }
    },
    {
        path: '/login',
        component: Login,
        meta:{
            show:false
        }
    },
    {
        path: '/friends',
        component: Friends,
        meta:{
            show:true
        }
    }
]


export default routes