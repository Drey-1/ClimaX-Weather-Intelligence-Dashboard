import { useEffect, useState } from "react";

export function useTheme() {
	const [isDarkMode, setDarkMode] = useState(false);

	const toggleTheme = () => {
		setDarkMode(!isDarkMode);
	};

	useEffect(() => {
		document.documentElement.classList.toggle("dark", isDarkMode);
	}, [isDarkMode]);

	return { isDarkMode, toggleTheme };
}
