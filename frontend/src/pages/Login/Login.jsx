import React, { useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

import "./login.styles.scss";

const Login = () => {
	const initialState = {
		username: "",
		password: "",
		isSubmitting: false,
		errorMessage: null,
	};

	const [data, setData] = useState(initialState);

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		setData({
			...data,
			isSubmitting: true,
			errorMessage: null,
		});
	};
	const handleInputChange = (event) => {
		setData({
			...data,
			[event.target.name]: event.target.value,
		});
	};
	return (
		<div className="flex full-height full-width align-items-center justify-content-center login-container page-container">
			<Card>
				<div className="login full-height full-width">
					<h2 className="login-heading text-center ">LOGIN</h2>
					<div className="login-user-icon m-auto surface-400 w-5rem h-5rem border-circle flex align-items-center justify-content-center">
						<i className="pi pi-user text-2xl"></i>
					</div>
					<form onSubmit={handleFormSubmit} className="login-form grid mt-2">
						<div className="input-div full-width m-2 mt-3">
							<span className="p-float-label">
								<InputText id="username" type="email" name="username" value={data.username} onChange={handleInputChange} required={true} className="input-c full-width" />
								<label htmlFor="username">Username</label>
							</span>
						</div>
						<div className="input-div full-width m-2 mt-3">
							<span className="p-float-label">
								<Password
									id="password"
									name="password"
									value={data.password}
									onChange={handleInputChange}
									toggleMask
									feedback={false}
									onSubmit={handleFormSubmit}
									required={true}
									className="input-p"
								/>
								<label htmlFor="password">Password</label>
							</span>
						</div>
						<Button type="submit" disabled={data.isSubmitting} className="login-button mt-2 m-auto">
							{data.isSubmitting ? <i className="pi pi-spin pi-spinner" style={{ fontSize: "2em" }}></i> : "Login"}
						</Button>
						{data.errorMessage && <span className="form-error">{data.errorMessage}</span>}
					</form>
				</div>
			</Card>
		</div>
	);
};

export default Login;
