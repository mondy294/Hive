
import { createRouter, createWebHistory } from "vue-router";
import routes from './routes'

const router = createRouter({
    history: createWebHistory(),
    routes
});
router.beforeEach((to, from, next) => {
    // 未登录 重定向至login
    if (to.fullPath !== '/login' && !localStorage.getItem('token')) {

        console.log(5555);


        next({ name: 'login' })
    }
    else {
        next()
    }

})

export default router;



