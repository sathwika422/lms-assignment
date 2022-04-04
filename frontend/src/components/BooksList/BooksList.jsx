import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import AddBookDialog from "../AddBookDialog/AddBookDialog";

const BooksList = () => {
	const allBooks = [
		{
			name: "alchemist",
			id: 1,
			description: "",
			author: "Sathvika",
			isAvailable: true,
			borrowedUsers: [{ name: "Sathvika", id: "u1" },{name:"Harshasri",id:"5"}],
		},
		{
			name: "stories we never tell",
			id: 2,
			description: "",
			author: "Savi Sharma",
			isAvailable: false,
			borrowedUsers: [{ name: "Sathvika", id: "u1" }],
		},
	];

	const [books, setBooks] = useState(allBooks);
	const [newBookDetail, setNewBookDetail] = useState({});
	const [displayAddBookDialog, setDisplayAddBookDialog] = useState(false);
	const [expandedRows, setExpandedRows] = useState(null);
	const toast = useRef(null);

	const header = (
		<div className="table-header-container flex justify-content-between mx-3">
			<h3>Books</h3>
			<Button
				icon="pi pi-plus"
				label="Add Book"
				onClick={() => {
					setDisplayAddBookDialog(true);
				}}
				className="mr-2"
			/>
		</div>
	);

	const rowExpansionTemplate = (data) => (
		<div className="books-subtable mx-4">
			<h4>Students who borrowed {data.name}</h4>
			<DataTable
				value={data.borrowedUsers}
				responsiveLayout="scroll"
				emptyMessage="No Borrowed Students">
				<Column field="id" header="Id" sortable></Column>
				<Column field="name" header="Student Name" sortable></Column>
			</DataTable>
		</div>
	);

	const handleAddNewBook = (e) => {
		e.preventDefault();
		const temp = books;
		temp.push({ ...newBookDetail, id: temp[temp.length - 1].id + 1 });
		setBooks([...temp]);
		setDisplayAddBookDialog(false);
		setNewBookDetail({});
	};
	return (
		<div className="books-container flex full-height full-width align-items-center justify-content-center page-container">
			<Toast ref={toast} />
			<AddBookDialog
				displayAddBookDialog={displayAddBookDialog}
				setDisplayAddBookDialog={setDisplayAddBookDialog}
				bookDetail={newBookDetail}
				setBookDetail={setNewBookDetail}
				handleAddNewBook={handleAddNewBook}
			/>
			<Card className="page-card overflow-auto">
				<div className="books-list">
					{/* allBooks.map((book, idx)=> {
                <div className="book" key={idx}>
                    
                </div>
            }) */}
					<DataTable
						value={books}
						expandedRows={expandedRows}
						onRowToggle={(e) => setExpandedRows(e.data)}
						responsiveLayout="scroll"
						rowExpansionTemplate={rowExpansionTemplate}
						dataKey="id"
						header={header}
						emptyMessage="No Books">
						<Column expander style={{ width: "3em" }} />
						<Column
							field="id"
							header="Id"
							sortable
							style={{ width: "3em" }}
						/>
						<Column field="name" header="Name" sortable />
						<Column
							field="description"
							header="Description"
							style={{ minWidth: "25vw" }}
						/>
						<Column field="author" header="Author" sortable />
						<Column
							field="isAvailable"
							header="Available"
							bodyClassName="text-center"
							style={{ width: "3em" }}
							body={(rowData) => (
								<div className="availability-icon">
									{rowData.isAvailable ? (
										<i className="pi pi-check-circle mr-2 text-green-500"></i>
									) : (
										<i
											className="pi pi-times-circle mr-2"
											style={{ color: "red" }}></i>
									)}
								</div>
							)}
							sortable
						/>
						<Column
							field=""
							header="Remove"
							bodyClassName="text-center"
							body={(rowData) => (
								<Button
									icon="pi pi-trash"
									className="p-button-danger p-button-rounded"
									onClick={() => {
										if (rowData.isAvailable) {
											setBooks(
												books.filter(
													(book) =>
														book.id !== rowData.id
												)
											);
										} else {
											toast.current.show({
												severity: "error",
												summary: "Remove unsuccessful",
												detail: "Cannot remove a book that is unavailable",
											});
										}
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

export default BooksList;
