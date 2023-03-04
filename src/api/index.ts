// 引入api接口
import requests from "./ajax";

// 注册用户接口
export const Register = (data: any) => {
    return requests({
        url: '/register',
        method: 'post',
        data,
    })
}
// 用户登录接口
export const Login = (data: any) => {
    return requests({
        url: '/login',
        method: 'post',
        data,
    })
}

//获取好友列表
export const getFriendsList = (params) => {
    return requests({
        url: '/getFriends',
        method: 'get',
        params,
    })
}