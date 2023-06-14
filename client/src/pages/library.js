"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
	InputValueContextProvider,
	useInputValueContext,
} from "../app/context/state";
import styles from "../app/library.module.scss";

function Library() {
	const { isbn, title } = useInputValueContext();
	const [isbnValue, setIsbnValue] = isbn;
	const [titleValue, setTitleValue] = title;
	const [books, setBooks] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const [prevIsbn, setPrevIsbn] = useState("");

	const fetchBooks = async () => {
		try {
			const response = await fetch("http://localhost:5000/books");
			if (response.ok) {
				const data = await response.json();
				setBooks(data);
				console.log(books);
			} else {
				console.log("Failed to fetch books");
			}
		} catch (error) {
			console.log("An error occurred while fetching books:", error);
		}
	};

	useEffect(() => {
		fetchBooks();
	}, []);

	const editBook = async (isbn) => {
		setIsEditing(true);
		setPrevIsbn(isbn);
	};

	const deleteBook = async (isbn) => {
		try {
			await axios.delete(`http://localhost:5000/book/${isbn}`);
			setBooks(books.filter((book) => book.isbn !== isbn));
		} catch (error) {
			console.log("Error occurred", error);
		}
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		const data = {
			isbn: isbnValue,
			title: titleValue,
		};

		fetch(`http://localhost:5000/book/${prevIsbn}`, {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => console.log(res))
			.then(() => fetchBooks());

		setIsEditing(false);
	};

	const exitHandler = async (e) => {
		e.preventDefault();
		setIsEditing(false);
	};

	return (
		<div className={styles.library}>
			<Link href="/" className={styles.exit}> ⬅ </Link>
			{books.map((book) => (
				<div key={book.isbn} className={styles.book}>
					<div className={styles.title}>{book.title}</div>
					<div className={styles.isbn}>ISBN: {book.isbn}</div>
					<div className={styles.buttons}>
						<button
							className={styles.deleteBtn}
							onClick={() => deleteBook(book.isbn)}
						>
							Delete
						</button>
						<button
							className={styles.editBtn}
							onClick={() => editBook(book.isbn)}
						>
							Edit
						</button>
					</div>
				</div>
			))}
			{isEditing ? (
				<div className={styles.editForm}>
					<div className={styles.form}>
						<label htmlFor="ISBN" className={styles.label}>
							ISBN
						</label>
						<input
							type="number"
							name="isbnValue"
							onChange={(e) => setIsbnValue(e.target.value)}
							value={isbnValue}
							className={styles.input}
						/>
						<label htmlFor="Title" className={styles.label}>
							Title
						</label>
						<input
							type="text"
							name="titleValue"
							onChange={(e) => {
								setTitleValue(e.target.value);
							}}
							value={titleValue}
							className={styles.input}
						/>
						<div className={styles.buttons}>
							<button
								className={styles.submitBtn}
								type="submit"
								onClick={submitHandler}
							>
								Submit
							</button>
							<button
								className={styles.exitBtn}
								type="submit"
								onClick={exitHandler}
							>
								X
							</button>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
}

export default function LibraryRoot() {
	return (
		<InputValueContextProvider>
			<Library />
		</InputValueContextProvider>
	);
}
