import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "primereact/checkbox";

const AddBookDialog = (props) => {
	const {
		bookDetail,
		setBookDetail,
		displayAddBookDialog,
		setDisplayAddBookDialog,
		handleAddNewBook,
	} = props;
	return (
		<Dialog
			header="Add New Book"
			modal
			visible={displayAddBookDialog}
			style={{ width: "60vw" }}
			footer={
				<div className="">
					<Button
						label="Add"
						type="submit"
						onClick={() => handleAddNewBook()}
					/>
				</div>
			}
			onHide={() => {
				setDisplayAddBookDialog(false);
				setBookDetail({});
			}}
			draggable={false}
			resizable={false}>
			<div className="inputs-container">
				<form action="" onSubmit={handleAddNewBook}>
					<div className="grid p-fluid">
						<div className="col field ">
							<label htmlFor="book-name" className="block">
								Name
							</label>
							<InputText
								id="book-name"
								className="block"
								value={bookDetail.name}
								onChange={(e) =>
									setBookDetail({
										...bookDetail,
										name: e.target.value,
									})
								}
							/>
						</div>
						<div className=" col field">
							<label htmlFor="book-author" className="block">
								Author
							</label>
							<InputText
								id="book-author"
								className="block"
								value={bookDetail.author}
								onChange={(e) =>
									setBookDetail({
										...bookDetail,
										author: e.target.value,
									})
								}
							/>
						</div>
					</div>
					<div className="grid p-fluid">
						<div className="col field">
							<label htmlFor="book-author" className="block">
								Description
							</label>
							<InputTextarea
								id="book-author"
								className="block"
								value={bookDetail.description}
								onChange={(e) =>
									setBookDetail({
										...bookDetail,
										description: e.target.value,
									})
								}
							/>
						</div>
					</div>
					<div className="grid p-fluid">
						<div className="field-checkbox">
							<label htmlFor="binary">Available</label>
							<Checkbox
								inputId="binary"
								className="m-2"
								checked={bookDetail.isAvailable}
								onChange={(e) =>
									setBookDetail({
										...bookDetail,
										isAvailable: e.checked,
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

export default AddBookDialog;
