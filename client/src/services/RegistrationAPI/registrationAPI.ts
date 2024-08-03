export const fetchRegistration = (user = {}) => {
  return new Promise<{
    message: string
    token: string
  }>((resolve, reject) =>
    // setTimeout(() => resolve({ token: "test token" }), 500),
    fetch("http://localhost:7000/api/user/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(user),
    })
      .then(res => {
        console.log(res)
        if (res.ok) {
          return res.json()
        } else {
          throw res.statusText
        }
      })
      .then(res => resolve(res))
      .catch(e => reject(e)),
  )
}
