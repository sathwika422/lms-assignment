import React from "react";
import { Route, Routes } from "react-router-dom";
import BooksBorrowedList from "../../components/BooksBorrowedList/BooksBorrowedList";

const StudentHome = () => {
  return (
    <Routes>
      <Route path="/" element={<BooksBorrowedList />} />
    </Routes>
  );
};

export default StudentHome;
