import Cookies from 'js-cookie'

const TokenKey = 'zgc_token'

const UserKey = 'zgc_user'
const RoleKey = 'user_role'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function getUser() {
  return Cookies.getJSON(UserKey)
}

export function getRole() {
  return Cookies.getJSON(RoleKey) || JSON.parse(localStorage.getItem(RoleKey))
}

export function setUser(userinfo) {
  console.log(userinfo, 'cookie')
  return Cookies.set(UserKey, userinfo)
}

export function setRole(role) {
  console.log(role, 'role')
  return Cookies.set(RoleKey, role)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function removeUser() {
  return Cookies.remove(UserKey)
}
export function removeRole() {
  return Cookies.remove(RoleKey)
}
