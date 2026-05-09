import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { type ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart";

const chartConfig = {
	value: {
		label: "Value",
		color: "var(--accent)",
	},
} satisfies ChartConfig;

export function Chart({ type, chartData }) {
	const chartType = {
		temp: 0,
		hum: 1,
		rain: 2,
	};
	const tickMap = [
		[0, 5, 10, 15, 20, 25, 30, 35, 40],
		[0, 20, 40, 60, 80, 100],
		[0, 5, 10],
	];
	const selectedTicks = tickMap[chartType[type]];
	return (
		<ChartContainer config={chartConfig}>
			<AreaChart
				accessibilityLayer
				data={chartData}
				margin={{
					left: 12,
					right: 12,
				}}
			>
				<CartesianGrid vertical={false} type="dashed" />
				<XAxis
					dataKey="hour"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					tickFormatter={(value) => value}
				/>
				<YAxis
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					domain={[0, "auto"]}
					ticks={selectedTicks}
				/>

				<ChartTooltip
					cursor={false}
					allowEscapeViewBox={{ x: true, y: true }}
					content={({ active, payload }) => {
						if (active && payload && payload.length) {
							return (
								<div className="relative -translate-11 ">
									<div className="bg-linear-to-b from-primary to-secondary text-center px-5 py-1 rounded-full text-white text-sm">
										{payload[0].value}
										{type == "temp" ? "C°" : type == "hum" ? "%" : "mm"}
									</div>
									<div className="absolute w-3 h-3 rotate-45 bg-secondary -z-10 -bottom-1 left-1/2 -translate-x-1/2" />
								</div>
							);
						}
						return null;
					}}
				/>

				<defs>
					<linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.8} />
						<stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0.1} />
					</linearGradient>
				</defs>

				<Area
					dataKey="value"
					type="natural"
					fill="url(#fillValue)"
					fillOpacity={0.4}
					stroke="var(--color-accent)"
					stackId="a"
				/>
			</AreaChart>
		</ChartContainer>
	);
}
