import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Chart, ChartTooltipContent } from "./Chart";

const mockChartData = [
    {
        hour: "00:00",
        value: 14,
    },
    {
        hour: "01:00",
        value: 13,
    },
    {
        hour: "02:00",
        value: 12,
    },
]

describe("Chart", () => {
	it("must renders without crashing when given valid chartData and type", () => {
        const component = () => render(<Chart type="temp" chartData={mockChartData}/>)

        expect(component).not.toThrow()
    });
});

describe("ChartTooltipContent", () => {
	it("must renders the value followed by the unit when active and payload exist", () => {
        render(<ChartTooltipContent active={true} payload={[{ value: 25 }]} unit="C°" />)

        expect(screen.getByText("25C°")).toBeInTheDocument()
    });

    it("must renders the correct unit for 'C°', '%' and 'mm'", () => {
        render(<ChartTooltipContent active={true} payload={[{ value: 25 }]} unit="C°" />)
        render(<ChartTooltipContent active={true} payload={[{ value: 79 }]} unit="%" />)
        render(<ChartTooltipContent active={true} payload={[{ value: 1.22 }]} unit="mm" />)

        expect(screen.getByText("25C°")).toBeInTheDocument()
        expect(screen.getByText("79%")).toBeInTheDocument()
        expect(screen.getByText("1.22mm")).toBeInTheDocument()
        
    });

    it("must renders nothing when active is false", () => {
        render(<ChartTooltipContent active={false} payload={[{ value: 25 }]} unit="C°" />)

        expect(screen.queryByText("25C°")).not.toBeInTheDocument()      
    });

    it("must renders nothing when payload is undefined", () => {
        render(<ChartTooltipContent active={true} payload={undefined} unit="C°" />)

        expect(screen.queryByText("C°")).not.toBeInTheDocument()      
    });

    it("must renders nothing when payload is an empty array", () => {
        render(<ChartTooltipContent active={true} payload={[]} unit="C°" />)

        expect(screen.queryByText("C°")).not.toBeInTheDocument()      
    });
});