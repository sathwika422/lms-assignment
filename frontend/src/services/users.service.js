import axios from "axios";

export function useUsersService() {
  return { login };

  function login() {
    const requestOptions = {
      method: "post",
      url: "http://localhost:4000/login",
    };

    return axios(requestOptions);
  }
}
