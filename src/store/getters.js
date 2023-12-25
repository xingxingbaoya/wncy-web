const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  wheight: state => state.app.wheight,
  isTransparentHead: state => state.app.isTransparentHead,
  token: state => state.user.token,
  isPerfect: state => state.user.isPerfect,
  name: state => state.user.name,
  roles: state => state.user.roles,
  item: state => state.user.userinfo,
  permission_routes: state => state.permission.routes
}
export default getters
