const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  nodes: state => state.ws.nodes,
  services: state => state.ws.services,
  routes: state => state.ws.routes
}
export default getters
