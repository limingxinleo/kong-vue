const ws = {
  state: {
    // 节点列表信息
    nodes: [],
    services: [],
    routes: [],
  },

  mutations: {
    SET_NODES: (state, nodes) => {
      state.nodes = nodes
    },
    SET_SERVICES: (state, services) => {
      state.services = services
    },
    SET_ROUTES: (state, routes) => {
      state.routes = routes
    }
  },

  actions: {}
}

export default ws

