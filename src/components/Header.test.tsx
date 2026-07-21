import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Header from "./Header";

vi.mock("./SearchBar", () => ({
	default: () => <div data-testid="search-bar" />,
}));
vi.mock("./SideBar", () => ({
	default: () => <div data-testid="side-bar" />,
}));
vi.mock("./ThemeSwitch", () => ({
	default: () => <div data-testid="theme-switch" />,
}));

describe("Header", () => {
	it("must renders the logo, title, SearchBar and ThemeSwitch", () => {
		render(<Header />);

		const logo = screen.getByRole("img");
		const title = screen.getByText("ClimaX");
		const searchBar = screen.getByTestId("search-bar");
		const themeSwitch = screen.getByTestId("theme-switch");

		expect(logo).toBeInTheDocument();
		expect(title).toBeInTheDocument();
		expect(searchBar).toBeInTheDocument();
		expect(themeSwitch).toBeInTheDocument();
	});

	it("must not render SideBar by default", () => {
		render(<Header />);

		const sideBar = screen.queryByTestId("side-bar");

		expect(sideBar).not.toBeInTheDocument();
	});

	it("must renders the MenuIcon by default (menu closed)", () => {
		const { container } = render(<Header />);

		const menu = container.querySelector(".lucide-menu");

		expect(menu).toBeInTheDocument();
	});

	it("must toggles to show SideBar and the X icon after clicking the menu button", () => {
		const { container } = render(<Header />);

		const btn = screen.getByRole("button");
		fireEvent.click(btn);

		const closeIcon = container.querySelector(".lucide-x");
		const sideBar = screen.queryByTestId("side-bar");

		expect(closeIcon).toBeInTheDocument();
		expect(sideBar).toBeInTheDocument();
	});

	it("must toggles back to hide SideBar and show MenuIcon after clicking the button twice", () => {
		const { container } = render(<Header />);

		const btn = screen.getByRole("button");
		fireEvent.click(btn);
		fireEvent.click(btn);

		const menuIcon = container.querySelector(".lucide-menu");
		const sideBar = screen.queryByTestId("side-bar");

		expect(menuIcon).toBeInTheDocument();
		expect(sideBar).not.toBeInTheDocument();
	});
});
