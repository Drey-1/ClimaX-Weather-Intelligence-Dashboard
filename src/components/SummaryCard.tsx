import dayjs from "dayjs";
import { CloudSunIcon, DropletsIcon, EyeIcon, MapPin, Wind } from "lucide-react";
import InfoItem from "./InfoItem";
export default function SummaryCard() {
	const data = dayjs();
	const today = data.format("DD MMM YY");
	const mockCity = {
		temperature: "24°",
		weather: "Sunny",
		wind: "9km/h",
		humidity: "25%",
		visibility: "1.2km",
		city: "Los Angeles",
	};

	return (
		<div className="bg-linear-to-b from-primary to-secondary p-6 rounded-3xl w-max h-max">
			<div className="text-xs">
				<p className=" text-gray-200">Today, {today}</p>
				<p className="flex items-center  text-white">
					<MapPin size={12} stroke="currentColor" />
					{mockCity.city}
				</p>
			</div>
			<div className="flex flex-col items-center p-4">
				<p className="text-gray-200 text-sm">{mockCity.weather}</p>
				<p className="text-5xl font-semibold bg-linear-to-b from-white via-white to-transparent bg-clip-text text-transparent">
					{mockCity.temperature}
				</p>
				<CloudSunIcon size={82} className="-translate-y-4 text-yellow-100" />
			</div>
			<div className="flex text-white text-sm items-center [&>*:not(:last-child)]:border-r [&>*:not(:last-child)]:border-white [&>*:not(:last-child)]:pr-6 [&>*:not(:first-child)]:pl-6">
				<InfoItem icon={Wind} value={mockCity.wind} label="wind" key={"wind"} />
				<InfoItem icon={DropletsIcon} value={mockCity.humidity} label="humidity" key={"humidity"} />
				<InfoItem
					icon={EyeIcon}
					value={mockCity.visibility}
					label="visibility"
					key={"visibility"}
				/>
			</div>
		</div>
	);
}
