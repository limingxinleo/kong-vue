export class KongWebSocket {
  static getInstance() {
    if (!KongWebSocket.instance) {
      KongWebSocket.instance = new KongWebSocket()
    }
    return KongWebSocket.instance;
  }

  constructor() {
    var ws = new WebSocket(process.env.WS_URL)
    ws.onopen = function (evt) {
      console.log("connected websocket!")
    }
    ws.onclose = function (evt) {
      console.log("disconnected websocket!")
    }
    ws.onmessage = function (evt) {
      console.log(evt)
    }
    ws.onerror = function (evt) {
      ws.close()
    }

    this.ws = ws
  }
}