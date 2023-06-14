import "./globals.scss";
import { InputValueContextProvider } from "./context/state";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<InputValueContextProvider>{children}</InputValueContextProvider>
			</body>
		</html>
	);
}
