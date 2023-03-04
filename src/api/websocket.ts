
function createWebsocket():WebSocket{
  return new WebSocket('ws://localhost:3000')
}

export default createWebsocket