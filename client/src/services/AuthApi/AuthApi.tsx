class AuthApi {
  constructor() {
    this.baseUrl = "http://localhost:7000/api";
  }
  createUser(user) {
    return fetch(this.baseUrl + "/user/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(user),
    });
  }
}

export default AuthApi;
