"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useInputValueContext } from "./context/state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import styles from "./page.module.scss";

function App() {
	const { isbn, title } = useInputValueContext();
	const [isbnValue, setIsbnValue] = isbn;
	const [titleValue, setTitleValue] = title;
	const [message, setMessage] = useState("");

	const submitHandler = async (e) => {
		e.preventDefault();

		const bookData = { isbn: isbnValue, title: titleValue };

		try {
			await fetch("http://localhost:5000/book", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(bookData),
			});

			setMessage("Book added to database");
			setIsbnValue("");
			setTitleValue("");
		} catch (error) {
			console.log("An error occurred", error);
		}
	};

	return (
		<div className={styles.page}>
			{message.length !== 0 ? (
				<div className={styles.message}>
					<div className={styles.icon}>
						<FontAwesomeIcon icon={faCircleCheck} />
					</div>
					<div className={styles.alert}>{message}</div>
				</div>
			) : null}
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
				onChange={(e) => setTitleValue(e.target.value)}
				value={titleValue}
				className={styles.input}
			/>
			<div className={styles.buttons}>
				<button
					type="submit"
					onClick={submitHandler}
					className={styles.submitBtn}
				>
					Submit
				</button>
				<Link href="/library" className={styles.link}>
					Go to library
				</Link>
			</div>
		</div>
	);
}

export default App;
