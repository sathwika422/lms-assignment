import React from "react";
import { Route, Routes } from "react-router-dom";
import BooksList from "../../components/BooksList/BooksList";
import UsersList from "../../components/UsersList/UsersList";

import "./admin-home.styles.scss";

const AdminHome = () => {
	return (
		<Routes>
			<Route path="/" element={<BooksList />} />
			<Route path="/users" element={<UsersList />} />
		</Routes>
	);
};

export default AdminHome;
