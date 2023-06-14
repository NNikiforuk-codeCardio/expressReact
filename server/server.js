const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

let books = [];

app.use(cors());
app.use(bodyParser.json());

app.post("/book", (req, res) => {
	const book = req.body;
	console.log(book);
	books.push(book);
	res.json({ message: "Book is added to the database" });
});

app.get("/book/:isbn", (req, res) => {
	// Reading isbn from the URL
	const isbn = req.params.isbn;

	// Searching books for the isbn
	for (let book of books) {
		if (book.isbn === isbn) {
			res.json(book);
			console.log(book);
			return;
		}
	}

	// Sending 404 when not found something is a good practice
	res.status(404).send("Book not found");
});

app.get("/books", (req, res) => {
	res.json(books);
});

app.delete("/book/:isbn", (req, res) => {
	const isbn = req.params.isbn;

	books = books.filter((i) => {
		if (i.isbn !== isbn) {
			return true;
		}
		return false;
	});
	res.json({ message: "Book is deleted" });
});

app.put("/book/:isbn", (req, res) => {
	const isbn = req.params.isbn;
	const newBook = req.body;

	for (let i = 0; i < books.length; i++) {
		let book = books[i];
		console.log(book);
		if (book.isbn === isbn) {
			books[i] = newBook;
		}
	}

	res.json({ message: "Book is edited" });
});

app.listen(5000, () => {
	console.log("Server started on 5000 port");
});
