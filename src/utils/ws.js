export class KongWebSocket {
  static getInstance() {
    if (!KongWebSocket.instance) {
      KongWebSocket.instance = new KongWebSocket()
    }
    return KongWebSocket.instance
  }

  constructor() {
    var that = this
    var ws = new WebSocket(process.env.WS_URL)
    ws.onopen = function(evt) {
      console.log('connected websocket!')
    }
    ws.onclose = function(evt) {
      console.log('disconnected websocket!')
    }
    ws.onmessage = function(evt) {
      var res = JSON.parse(evt.data)
      switch (res.id) {
        case 'status':
          that.nodes = res.data
          break
      }
    }
    ws.onerror = function(evt) {
      ws.close()
    }

    this.ws = ws
    // 初始化节点列表
    this.nodes = []
  }

  init(token) {
    var data = {
      id: 'init',
      data: {
        token: token
      }
    }
    this.ws.send(JSON.stringify(data))
  }

  services(size = 10, next = null) {
    var data = {
      id: 'services',
      data: {
        size: size,
        next: next
      }
    }
    this.ws.send(JSON.stringify(data))
  }

  status() {
    var data = {
      id: 'status',
      data: {}
    }
    this.ws.send(JSON.stringify(data))
  }
}
