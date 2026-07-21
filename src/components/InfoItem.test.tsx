import { render, screen } from "@testing-library/react";
import { DropletIcon } from "lucide-react";
import { describe, expect, it } from "vitest";
import InfoItem from "./InfoItem";

describe("InfoItem", () => {
	it("must renders the icon, value and label", () => {
		const { container } = render(<InfoItem icon={DropletIcon} label="humidity" value="70%" />);

		expect(screen.getByText("70%")).toBeInTheDocument();
		expect(screen.getByText("humidity")).toBeInTheDocument();
		expect(container.querySelector(".lucide-droplet")).toBeInTheDocument();
	});
});
