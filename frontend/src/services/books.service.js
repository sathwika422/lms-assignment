import axios from "axios";

export function useBooksService() {
  return { getAllBooks,createNewBook};

  function getAllBooks() {
    const requestOptions = {
      method: "get",
      url: "http://localhost:8080/books",
    };

    return axios(requestOptions);
  }
  function createNewBook(book) {
    const requestOptions = {
      method: "post",
      url: "http://localhost:8080/book",
      data:book
    };

    return axios(requestOptions);
  }

}
