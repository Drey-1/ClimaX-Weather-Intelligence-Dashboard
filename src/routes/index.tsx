import { createFileRoute } from "@tanstack/react-router";
import ForecastCard from "@/components/ForecastCard";
import SummaryCard from "@/components/SummaryCard";
import WeatherChart from "@/components/WeatherChart";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex gap-4 mt-2">
				<SummaryCard />
				<ForecastCard />
			</div>
			<WeatherChart />
		</div>
	);
}
