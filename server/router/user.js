const express = require('express')
const router = express.Router()

const userhandle = require('../router_handle/user')
//注册
router.post('/register', userhandle.register)
//登录
router.post('/login', userhandle.login)
// 获取好友列表
router.get('/getFriends', userhandle.getFriends)

module.exports = router