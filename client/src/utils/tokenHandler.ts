export const saveToken = token => {
  localStorage.setItem("token", token)
}

export const deleteToken = () => {
  localStorage.removeItem("token")
}
