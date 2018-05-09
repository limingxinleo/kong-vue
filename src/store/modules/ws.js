import { KongWebSocket } from '@/utils/ws'

const ws = {
  state: {
    // 节点列表信息
    nodes: []
  },

  mutations: {
    SET_NODES: (state, nodes) => {
      state.nodes = nodes
    }
  },

  actions: {}
}

export default ws

