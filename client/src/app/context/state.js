"use client";

import { createContext, useContext, useState } from "react";

const InputValueContext = createContext({
	isbn: ["", () => {}],
	title: ["", () => {}],
});

export const InputValueContextProvider = ({ children }) => {
	const [isbn, setIsbn] = useState("");
	const [title, setTitle] = useState("");

	return (
		<InputValueContext.Provider
			value={{ isbn: [isbn, setIsbn], title: [title, setTitle] }}
		>
			{children}
		</InputValueContext.Provider>
	);
};

export const useInputValueContext = () => useContext(InputValueContext);
