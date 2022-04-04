import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import AdminHome from "./pages/AdminHome/AdminHome";
import StudentHome from "./pages/StudentHome/StudentHome";

function App() {
	return (
		<div className="app">
			<Router>
				<Routes>
					<Route path="login" element={<Login />} />
					<Route path="admin/*" element={<AdminHome />} />
					<Route path="student/*" element={<StudentHome/>}/> 
					
				</Routes>
			</Router>
		</div>
	);
}

export default App;
