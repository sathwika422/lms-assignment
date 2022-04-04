import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React from "react";

const AddUserDialog = (props) => {
	const {
		userDetail,
		setUserDetail,
		displayAddUserDialog,
		setDisplayAddUserDialog,
		handleAddUser,
	} = props;
	return (
		<Dialog
			header="Add New User"
			modal
			visible={displayAddUserDialog}
			style={{ width: "60vw" }}
			footer={
				<div className="">
					<Button
						label="Add"
						type="submit"
						onClick={handleAddUser}
					/>
				</div>
			}
			onHide={() => {
				setDisplayAddUserDialog(false);
				setUserDetail({});
			}}
			draggable={false}
			resizable={false}>
			<div className="inputs-container">
				<form action="" onSubmit={handleAddUser}>
					<div className="grid p-fluid">
						<div className="col field ">
							<label htmlFor="book-name" className="block">
								Name
							</label>
							<InputText
								id="book-name"
								className="block"
								value={userDetail.name}
								onChange={(e) =>
									setUserDetail({
										...userDetail,
										name: e.target.value,
									})
								}
							/>
						</div>
					</div>
					<div className="grid p-fluid">
						<div className="col field-checkbox">
							<label htmlFor="binary">Admin</label>
							<Checkbox
								inputId="binary"
								className="m-2 mb-0"
								checked={userDetail.isAdmin}
								onChange={(e) =>
									setUserDetail({
										...userDetail,
										isAdmin: e.checked,
									})
								}
							/>
						</div>
					</div>
				</form>
			</div>
		</Dialog>
	);
};

export default AddUserDialog;
