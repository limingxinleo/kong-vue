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
  }
}
