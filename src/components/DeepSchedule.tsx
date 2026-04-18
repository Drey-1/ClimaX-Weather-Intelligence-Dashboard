import { CloudDrizzleIcon, DropletIcon } from "lucide-react";

const mock = [
	{
		day: "01",
		weekday: "Mon",
		Icon: CloudDrizzleIcon,
		minMax: ["23°C", "28°C"],
		precipitation: "19.88mm",
	},
	{
		day: "02",
		weekday: "Tue",
		Icon: CloudDrizzleIcon,
		minMax: ["23°C", "28°C"],
		precipitation: "19.88mm",
	},
	{
		day: "03",
		weekday: "Wed",
		Icon: CloudDrizzleIcon,
		minMax: ["23°C", "28°C"],
		precipitation: "19.88mm",
	},
	{
		day: "04",
		weekday: "Thu",
		Icon: CloudDrizzleIcon,
		minMax: ["23°C", "28°C"],
		precipitation: "19.88mm",
	},
];

export default function DeepSchedule() {
	return (
		<div className="px-4 text-icons text-xl ">
			{mock.map((day) => {
				return (
					<div
						key={day.day}
						className="grid grid-cols-4 items-center border-t border-card-foreground"
					>
						<div className="text-center p-1">
							<p>{day.day}</p>
							<p>{day.weekday}</p>
						</div>
						<day.Icon size={38} />
						<div className="flex gap-4">
							<div className="text-accent">{day.minMax[0]}</div>
							<div className="text-destructive">{day.minMax[1]}</div>
						</div>
						<div className="flex">
							<DropletIcon />
							{day.precipitation}
						</div>
					</div>
				);
			})}
		</div>
	);
}
