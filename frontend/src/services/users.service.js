import axios from "axios";

export function useUsersService() {
  return { getAllUsers,createNewUser,getUserById,deleteUserById };
  

  function getAllUsers() {
    const requestOptions = {
      method: "get",
      url: "http://localhost:8080/api/v1/users/",
    };

    return axios(requestOptions);
  }
  function createNewUser(user){
    const requestOptions = {
      method: "post",
      url: "http://localhost:8080/api/v1/create_user/",
      data: user
    };

    return axios(requestOptions);


  }
  function getUserById(id){
    const requestOptions = {
      method: "get",
      url: `http://localhost:8080/api/v1/users/${id}`,
      
    };

    return axios(requestOptions);


  }
  function deleteUserById(id){
    const requestOptions = {
      method: "delete",
      url: `http://localhost:8080/api/v1/users/${id}`,
      
    };

    return axios(requestOptions);
    

  }

}
