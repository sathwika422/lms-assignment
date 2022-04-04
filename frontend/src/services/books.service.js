import axios from "axios";

export function useBooksService() {
  return { getAllBooks };

  function getAllBooks() {
    const requestOptions = {
      method: "get",
      url: "http://localhost:4000/all_books",
    };

    return axios(requestOptions);
  }
}
