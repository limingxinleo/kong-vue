import { KongWebSocket } from '@/utils/ws'

const ws = {
  state: {
    nodes: KongWebSocket.getInstance().nodes || []
  },

  mutations: {
    SET_NODES: (state, nodes) => {
      state.nodes = nodes
    }
  },

  actions: {

  }
}

export default ws

