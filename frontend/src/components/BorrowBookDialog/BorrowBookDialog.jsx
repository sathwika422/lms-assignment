import { Dialog } from "primereact/dialog";
import React, { useRef } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const BorrowBookDialog = (props) => {
	const {
		allBooks,
		borrowedBooks,
		newBorrowedBooks,
		setNewBorrowedBooks,
		displayBorrowBookDialog,
		setDisplayBorrowBookDialog,
		handleBorrowBooks,
		filteredBooksList,
		searchBooks,
	} = props;

	const toast = useRef(null);

	return (
		<Dialog
			header="Borrow New Book"
			modal
			visible={displayBorrowBookDialog}
			style={{ width: "60vw" }}
			footer={
				<div className="">
					<Button
						label="Borrow"
						type="submit"
						onClick={handleBorrowBooks}
					/>
				</div>
			}
			onHide={() => {
				setDisplayBorrowBookDialog(false);
				setNewBorrowedBooks([]);
			}}
			draggable={false}
			resizable={false}>
			<Toast ref={toast} />
			<div className="">
				<div className="grid p-fluid">
					<div className="field col">
						<label
							htmlFor="auto-complete-books-name"
							className="block">
							Enter book name
						</label>
						<AutoComplete
							id="auto-complete-books-name"
							className="block"
							value={newBorrowedBooks}
							suggestions={filteredBooksList}
							completeMethod={searchBooks}
							field="name"
							onChange={(e) => {
								if (e.value.length <= 2) {
									setNewBorrowedBooks(e.value);
								} else {
									toast.current.show({
										severity: "error",
										summary: "Error",
										detail: "Cannot borrow more than 2 books at once",
									});
								}
							}}
							multiple
						/>
					</div>
				</div>
				<DataTable
					value={allBooks}
					className="mt-4"
					editMode="row"
					dataKey="id"
					showGridlines>
					<Column
						field="id"
						header="Id"
						style={{ width: "3em" }}></Column>
					<Column field="name" header="Name"></Column>
					<Column
						field="description"
						header="Description"
						style={{ width: "30%" }}></Column>
					<Column field="author" header="Author"></Column>
					<Column
						body={(rowData) => (
							<Button
								icon="pi pi-plus"
								onClick={() => {
									if (newBorrowedBooks.length < 2) {
										const temp = newBorrowedBooks;
										temp.push(rowData);
										setNewBorrowedBooks([...temp]);
									} else {
										toast.current.show({
											severity: "error",
											summary: "Error",
											detail: "Cannot borrow more than 2 books at once",
										});
									}
								}}
								disabled={
									borrowedBooks.filter(
										(each) => each.id === rowData.id
									).length ||
									newBorrowedBooks.filter(
										(each) => each.id === rowData.id
									).length
										? true
										: false
								}
							/>
						)}
						style={{ width: "3em" }}
						bodyStyle={{ textAlign: "center" }}></Column>
				</DataTable>
			</div>
		</Dialog>
	);
};

export default BorrowBookDialog;
