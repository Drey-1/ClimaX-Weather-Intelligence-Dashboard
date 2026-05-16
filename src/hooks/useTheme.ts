import { useEffect, useState } from "react";
import { loadTheme, saveTheme } from "@/services/localStorage";

export function useTheme() {
	const [isDarkMode, setDarkMode] = useState(() => {
		const theme = loadTheme();
		return theme === "dark";
	});

	const toggleTheme = () => {
		setDarkMode(!isDarkMode);
	};

	useEffect(() => {
		document.documentElement.classList.toggle("dark", isDarkMode);
		saveTheme(isDarkMode ? "dark" : "light");
	}, [isDarkMode]);

	return { isDarkMode, toggleTheme };
}
