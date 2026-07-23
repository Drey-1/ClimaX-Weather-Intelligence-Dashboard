import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SideBar from "./SideBar";

vi.mock("@tanstack/react-router", () => ({
	Link: ({ children, to, className }: { children: React.ReactNode; to: string; className?: string }) => (
		<a href={to} className={className}>{children}</a>
	),
}));
vi.mock("./SearchDialog", () => ({
	default: () => <div data-testid="search-dialog" />,
}));

describe("SideBar", () => {
	it("must renders links to '/', '/dashboard' and '/favorites'", () => {
        render(<SideBar/>)

        const links = document.body.querySelectorAll("a")

        expect(links).toHaveLength(3)
        expect(links[0]).toHaveAttribute("href","/")
        expect(links[1]).toHaveAttribute("href","/dashboard")
        expect(links[2]).toHaveAttribute("href","/favorites")
    });

	it("must renders the Grid2X2, Calendar and Star icons for the navigation links", () => {
        render(<SideBar/>)

        const grid2x2Icon = document.body.querySelector(".lucide-grid2x2")
        const calendarIcon = document.body.querySelector(".lucide-calendar")
        const starIcon = document.body.querySelector(".lucide-star")

        expect(grid2x2Icon).toBeInTheDocument()
        expect(calendarIcon).toBeInTheDocument()
        expect(starIcon).toBeInTheDocument()
    });

	it("must renders the MapPin icon as the dialog trigger", () => {
        render(<SideBar/>)

        const mapPinIcon = document.body.querySelector(".lucide-map-pin")

        expect(mapPinIcon).toBeInTheDocument()
    });

	it("must includes the SearchDialog inside the Dialog", () => {
        render(<SideBar/>)

        const searchDialog = screen.getByTestId("search-dialog")

        expect(searchDialog).toBeInTheDocument()
    });
});
