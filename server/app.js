const express = require('express')
const app = express()
const fs = require("fs");
const joi = require('@hapi/joi')
const bodyParser = require('body-parser')

//允许跨域
const cors = require('cors')

// 配置解析token的中间件
const expressJWT = require('express-jwt')
const config = require('./config')

app.use(cors())

//修改能够接收请求体大小的最大限制  此中间件必须在下面那个中间件前注册
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(express.json({ limit: '5mb' }));

app.use(express.static('assest'))

//配置表单数据解析
app.use(express.urlencoded({ extended: false }))

app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/] }))



//导入用户模块
const userRouter = require('./router/user')
app.use('/api', userRouter)


//错误级别中间件
app.use((err, req, res, next) => {
    //验证失败导致的错误
    if (err instanceof joi.ValidationError) return res.send(err)
    //身份验证失败后的错误
    if (err.name === 'UnauthorizedError') {
        return res.send({ status: 1, message: '身份验证失败' })
    }
    //未知错误
    else {
        return res.send({ status: 1, message: err })
    }
})





app.listen(3007, function () {
    console.log('running in 3007');
})
