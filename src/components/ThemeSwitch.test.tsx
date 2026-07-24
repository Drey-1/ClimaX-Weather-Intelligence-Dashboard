import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useTheme } from "@/hooks/useTheme";
import ThemeSwitch from "./ThemeSwitch";

vi.mock("@/hooks/useTheme");

describe("ThemeSwitch", () => {
	it("must renders the checkbox unchecked when isDarkMode is false", () => {
		vi.mocked(useTheme).mockReturnValue({
			isDarkMode: false,
			toggleTheme: vi.fn(),
		});
		render(<ThemeSwitch />);

		const checkbox = document.querySelector(".sr-only");

		expect(checkbox).not.toBeChecked();
	});

	it("must renders the checkbox checked when isDarkMode is true", () => {
		vi.mocked(useTheme).mockReturnValue({
			isDarkMode: true,
			toggleTheme: vi.fn(),
		});
		render(<ThemeSwitch />);

		const checkbox = document.querySelector(".sr-only");

		expect(checkbox).toBeChecked();
	});

	it("must calls toggleTheme when the checkbox is clicked", () => {
		const mockToggleTheme = vi.fn();
		vi.mocked(useTheme).mockReturnValue({
			isDarkMode: true,
			toggleTheme: mockToggleTheme,
		});
		render(<ThemeSwitch />);

		const checkbox = document.querySelector(".sr-only");

		fireEvent.click(checkbox);

		expect(mockToggleTheme).toHaveBeenCalled();
	});

	it("must renders both Sun and Moon icons", () => {
		vi.mocked(useTheme).mockReturnValue({
			isDarkMode: true,
			toggleTheme: vi.fn(),
		});
		render(<ThemeSwitch />);

		const sunIcon = document.querySelector(".lucide-sun");
		const moonIcon = document.querySelector(".lucide-moon");

		expect(sunIcon).toBeInTheDocument();
		expect(moonIcon).toBeInTheDocument();
	});
});
