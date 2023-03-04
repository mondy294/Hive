const express = require('express')

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
const router = express.Router()


const userhandle = require('../router_handle/user')
//注册
router.post('/register', userhandle.register)
//登录
router.post('/login', userhandle.login)
// 获取好友列表
router.get('/getFriends', userhandle.getFriends)

// 更换头像
router.post('/updateAvator', multipartMiddleware, userhandle.updateAvator)

module.exports = router