const ws = require('nodejs-websocket')
const { LOGIN, USER_IN_ROOM, USER_LEAVE_ROOM, MESSAGE } = require('./config')

function singleChat(server,data, receiverID) {
  server.connections.forEach((connect) => {
    if (connect.id == receiverID) {
      connect.send(JSON.stringify(data))
      return
    }
  })
  return ['failed', '未找到消息接收人']
}

function startWebsocket() {
  const server = ws.createServer((connect) => {
    console.log('new lian')
    connect.on('text', (data) => {
      data = JSON.parse(data)
      if (data.type === LOGIN) {
        connect.id = data.id
      } else if (data.type === USER_IN_ROOM) {
      } else if (data.type === USER_LEAVE_ROOM) {
      } else if (data.type === MESSAGE) {
        const { receiver } = data
        connect.send(JSON.stringify(data))
        singleChat(server,data, receiver)
      } else {
        console.log(data)
      }
    })
    connect.on('close', () => {
      console.log('websocket连接断开....')
    })

    //监听websocket异常信息
    connect.on('error', () => {
      console.log('websocket连接异常....')
    })
  })
  return server
}

module.exports = startWebsocket
