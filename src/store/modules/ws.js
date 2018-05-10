const ws = {
  state: {
    // 节点列表信息
    nodes: [],
    services: []
  },

  mutations: {
    SET_NODES: (state, nodes) => {
      state.nodes = nodes
    },
    SET_SERVICES: (state, services) => {
      state.services = services
    }
  },

  actions: {}
}

export default ws

