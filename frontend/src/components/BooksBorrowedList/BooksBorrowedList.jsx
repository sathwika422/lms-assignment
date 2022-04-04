import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import BorrowBookDialog from "../BorrowBookDialog/BorrowBookDialog";

const BooksBorrowedList = () => {
  const allBorrowedBooks = [
    {
      name: "alchemist",
      id: 1,
      returnDate: new Date(
        new Date().setDate(new Date().getDate() + 1)
      ).toDateString(),
    },
    {
      name: "stories we never tell",
      id: 2,
      returnDate: new Date(
        new Date().setDate(new Date().getDate() - 5)
      ).toDateString(),
    },
  ];

  const [borrowedBooks, setBorrowedBooks] = useState(allBorrowedBooks);

  const allBooks = [{
    name: "alchemist",
    id: 1,
    description: "",
    author: "",
    isAvailable: true,
  },
  {
    name: "stories we never tell",
    id: 2,
    description: "",
    author: "savi sharma",
    isAvailable: true,
  },
  {
    name: "mathematics",
    id: 3,
    description: "",
    author: "srinivasa ramanujan",
    isAvailable: true,
  }
]

  useEffect(()=>{
    console.log(borrowedBooks);
  },[borrowedBooks])

  const toast = useRef(null);
  const [newBorrowedBooks, setNewBorrowedBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [displayBorrowBookDialog, setDisplayBorrowBookDialog] = useState(false)

  const searchBooks = (event) => {
    setTimeout(() => {
      let _filteredBooks;
      if (!event.query.trim().length) {
          _filteredBooks = [...allBooks];
      }
      else {
          _filteredBooks = allBooks.filter((book) => {
              return book.name.toLowerCase().includes(event.query.toLowerCase());
          });
      }

      console.log(_filteredBooks);

      setFilteredBooks(_filteredBooks);
  }, 250);
  }

  const handleBorrowBooks = () => {
    let validated = true;
    newBorrowedBooks.forEach((each) => {
      if (validated) {
        const borrowedBook = borrowedBooks.filter((book)=> book.id === each.id)
        if (borrowedBook.length) {
          validated = false
        }
        else {
          validated = true
        }
      } else validated = false;
    })
    if (validated) {
      let temp = borrowedBooks;
      let newTemp = newBorrowedBooks;
      newTemp.forEach((eachBook)=> {
        eachBook.returnDate = new Date(new Date().setDate(new Date().getDate() + 5)).toDateString()
      })
      temp = [ ...temp, ...newBorrowedBooks ];
      console.log(temp, newBorrowedBooks);
      setBorrowedBooks([...temp]);
      setDisplayBorrowBookDialog(false);
      setNewBorrowedBooks([]);
    } else {
      toast.current.show({severity: "error", summary: "Error", detail: "Cannot borrow the same book twice."})
    }
  }

  const header = (
    <div className="table-header-container flex justify-content-between mx-3">
      <h3>Borrowed Books</h3>
      <Button
        icon="pi pi-plus"
        label="Borrow New Book"
        onClick={() => {
          setDisplayBorrowBookDialog(true);
        }}
        className="mr-2"
      />
    </div>
  );

  return (
    <div className="borrowed-books-container flex full-height full-width align-items-center justify-content-center page-container">
      <Toast ref={toast} />
      <BorrowBookDialog 
      allBooks={allBooks}
      borrowedBooks={borrowedBooks}
      displayBorrowBookDialog={displayBorrowBookDialog}
      setDisplayBorrowBookDialog={setDisplayBorrowBookDialog}
      newBorrowedBooks={newBorrowedBooks}
      setNewBorrowedBooks={setNewBorrowedBooks}
      filteredBooksList={filteredBooks}
      searchBooks={searchBooks}
      handleBorrowBooks={handleBorrowBooks}
      />
      <Card className="page-card overflow-auto">
        <div className="borrowed-books-list">
          <DataTable
            value={borrowedBooks}
            responsiveLayout="scroll"
            dataKey="id"
            header={header}
            emptyMessage="No Books"
          >
            <Column field="id" header="Id" sortable style={{ width: "3em" }} />
            <Column field="name" header="Name" sortable />
            <Column
              field="returnDate"
              header="Return By"
              bodyClassName="text-center"
              style={{ width: "3em" }}
              sortable
            />
            <Column
              header="Overdue"
              bodyClassName="text-center"
              style={{ width: "10vw" }}
              body={(rowData) => (
                <div className="overdue-icon">
                  {new Date(rowData.returnDate) <
                  new Date() ? (
                    <i
                      className="pi pi-check-circle mr-2 "
                      style={{ color: "red" }}
                    ></i>
                  ) : (
                    <i className="pi pi-times-circle text-green-500 mr-2"></i>
                  )}
                </div>
              )}
            />
          </DataTable>
        </div>
      </Card>
    </div>
  );
};

export default BooksBorrowedList;
