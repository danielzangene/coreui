import jwt_decode from 'jwt-decode'

export const isUserLoggedIn = () => {
  const accessToken = localStorage.getItem('accessToken')
  return new Boolean(accessToken)
}

export const getUserData = () => {
  const storedUserData = {}
  if (isUserLoggedIn()) {
    return jwt_decode(localStorage.getItem("accessToken"))
  }
  return storedUserData
}

export const getAccessToken = () => {
    return localStorage.getItem("accessToken")
}

export const logoutHandler = (message) => {
  localStorage.removeItem('accessToken')
  location.href = `/sign-in`
}
