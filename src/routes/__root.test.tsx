import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RootComponent } from "@/routes/__root";

vi.mock("@/components/Header", () => ({
	default: () => <div data-testid="header" />,
}));
vi.mock("@tanstack/react-router", () => ({
	createRootRoute: vi.fn(() => ({})),
	Outlet: () => <div data-testid="outlet" />,
}));

describe("Root Route", () => {
	it("must renders Header and Outlet", () => {
		render(<RootComponent />);

		const header = screen.getByTestId("header");
		const outlet = screen.getByTestId("outlet");

		expect(header).toBeInTheDocument();
		expect(outlet).toBeInTheDocument();
	});
});
