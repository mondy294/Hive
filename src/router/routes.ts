import { RouteRecord, RouteRecordRaw, RouterOptions } from "vue-router"
import Home from "../pages/Home.vue";
import Chat from "../pages/Chat.vue";
import Login from "../pages/Login.vue";
import Friends from '../pages/Friends.vue'
import Edit from '../pages/Edit.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
            show: true,
            ws: { id: 994 }
        }
    },
    {
        path: '/chat',
        name: 'chat',
        component: Chat,
        meta: {
            show: false
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            show: false
        }
    },
    {
        path: '/friends',
        component: Friends,
        meta: {
            show: true
        }
    },
    {
        path: '/edit',
        name: 'edit',
        component: Edit,
        meta: {
            show: false
        }
    }

]


export default routes