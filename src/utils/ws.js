export class KongWebSocket {
  static getInstance() {
    if (!KongWebSocket.instance) {
      KongWebSocket.instance = new KongWebSocket()
    }
    return KongWebSocket.instance
  }

  constructor() {
    const that = this
    var ws = new WebSocket(process.env.WS_URL)
    ws.onopen = function(evt) {
      console.log('connected websocket!')
    }
    ws.onclose = function(evt) {
      console.log('disconnected websocket!')
    }
    ws.onmessage = function(evt) {
      var res = JSON.parse(evt.data)
      console.log(res)
      switch (res.id) {
        case 'status':
          global.vue.$store.commit('SET_NODES', res.data)
          break
        case 'services':
          global.vue.$store.commit('SET_SERVICES', res.data)
          break
        case 'deleteService':
          that.services(10)
          break
      }
    }
    ws.onerror = function(evt) {
      ws.close()
    }

    this.ws = ws
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

  upsertService(form) {
    var data = {
      id: 'upsertService',
      data: form
    }
    this.ws.send(JSON.stringify(data))
  }

  deleteService(id) {
    var data = {
      id: 'deleteService',
      data: {
        id: id
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
