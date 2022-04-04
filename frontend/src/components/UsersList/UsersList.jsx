import React, { useRef, useState } from "react";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import AddUserDialog from "../AddUserDialog/AddUserDialog";

const UsersList = () => {
	const allUserDetails = [
		{
			name: "Sathvika",
			id: 1,
			borrowedBooks: [
				{
					name: "alchemist",
					id: 1,
				},
				{
					name: "stories we never tell",
					id: 2,
				},
			],
		},
		{
			name: "Mani Teja",
			id: 2,
			borrowedBooks: [],
		},
	];
	const [users, setUsers] = useState(allUserDetails);
	const [newUserDetail, setNewUserDetail] = useState({});
	const [expandedRows, setExpandedRows] = useState(null);
	const [displayAddUserDialog, setDisplayAddUserDialog] = useState(null);
	const toast = useRef(null);

	const header = (
		<div className="table-header-container flex justify-content-between mx-3">
			<h3>Users</h3>
			<Button
				icon="pi pi-plus"
				label="Add New User"
				onClick={() => {
					setDisplayAddUserDialog(true);
				}}
				className="mr-2"
			/>
		</div>
	);

	const rowExpansionTemplate = (data) => (
		<div className="users-subtable mx-4">
			<h4>Books borrowed by {data.name}</h4>
			<DataTable
				value={data.borrowedBooks}
				responsiveLayout="scroll"
				emptyMessage="No Books Borrowed">
				<Column field="id" header="Id" sortable></Column>
				<Column field="name" header="Book Name" sortable></Column>
			</DataTable>
		</div>
	);

	const handleAddNewUser = (e) => {
		e.preventDefault();
		const temp = users;
		temp.push({ ...newUserDetail, id: temp[temp.length - 1].id + 1 });
		setUsers([...temp]);
		setDisplayAddUserDialog(false);
		setNewUserDetail({});
	};

	return (
		<div className="users-container flex full-height full-width align-items-center justify-content-center page-container">
			<Toast ref={toast} />
			<AddUserDialog
				displayAddUserDialog={displayAddUserDialog}
				setDisplayAddUserDialog={setDisplayAddUserDialog}
				userDetail={newUserDetail}
				setUserDetail={setNewUserDetail}
				handleAddUser={handleAddNewUser}
			/>
			<Card className="page-card overflow-auto">
				<div className="users-list">
					<DataTable
						value={users}
						expandedRows={expandedRows}
						onRowToggle={(e) => setExpandedRows(e.data)}
						responsiveLayout="scroll"
						rowExpansionTemplate={rowExpansionTemplate}
						dataKey="id"
						header={header}
						emptyMessage="No Users">
						<Column expander style={{ width: "3em" }} />
						<Column
							field="id"
							header="Id"
							sortable
							style={{ width: "3em" }}
						/>
						<Column field="name" header="Name" sortable />
						<Column
							field="isAdmin"
							header="Role"
							bodyClassName="text-center"
							style={{ width: "3em" }}
							body={(rowData) => (
								<div className="admin-role">
									{rowData.isAdmin ? "Admin" : "Student"}
								</div>
							)}
							sortable
						/>
						<Column
							field=""
							header="Remove"
							bodyClassName="text-center"
							style={{ width: "10vw" }}
							body={(rowData) => (
								<Button
									icon="pi pi-trash"
									className="p-button-danger p-button-rounded"
									onClick={() => {
										setUsers(
											users.filter(
												(user) => user.id !== rowData.id
											)
										);
									}}
								/>
							)}
						/>
					</DataTable>
				</div>
			</Card>
		</div>
	);
};

export default UsersList;
