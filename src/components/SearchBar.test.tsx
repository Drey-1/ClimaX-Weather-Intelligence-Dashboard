import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SearchBar from "./SearchBar";

vi.mock("./SearchDialog", () => ({
	default: () => <div data-testid="search-dialog" />,
}));

describe("Searchbar", () => {
	it("must renders the search button with icon and placeholder text", () => {
		const { container } = render(<SearchBar />);

        expect(screen.getByText("Search City...")).toBeInTheDocument()
        expect(container.querySelector(".lucide-search")).toBeInTheDocument()
	});
});
