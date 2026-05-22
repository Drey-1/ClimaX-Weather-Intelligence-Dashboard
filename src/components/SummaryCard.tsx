import dayjs from "dayjs";
import { DropletsIcon, EyeIcon, MapPin, Wind } from "lucide-react";
import { useSelectedCity } from "@/contexts/SelectedCityContext";
import { useSummaryWeather } from "@/hooks/useSummaryWeather";
import InfoItem from "./InfoItem";

export default function SummaryCard() {
	const { selectedCity } = useSelectedCity();
	const { data: summaryWeather, isPending, isError } = useSummaryWeather(selectedCity);
	const data = dayjs();
	const today = data.format("DD MMM YY");

	if (isPending)
		return (
			<div className="flex flex-col gap-11 items-center bg-linear-to-b from-primary to-secondary p-6 rounded-3xl w-max h-max">
				<div className="h-32 w-48 bg-white  rounded-xl animate-pulse" />
				<div className="h-26 w-68 bg-white  rounded-xl animate-pulse" />
			</div>
		);

	if (isError)
		return (
			<div className="bg-destructive  p-6 rounded-3xl w-max h-max">
				<p className="text-white text-sm">Erro ao carregar dados.</p>
			</div>
		);

	return (
		<div className="bg-linear-to-b from-primary to-secondary p-6 rounded-3xl w-max h-max">
			<div className="text-xs">
				<p className=" text-gray-200">Today, {today}</p>
				<p className="flex items-center  text-white">
					<MapPin size={12} stroke="currentColor" />
					{selectedCity}
				</p>
			</div>
			<div className="flex flex-col items-center p-4">
				<p className="text-gray-200 text-sm">{summaryWeather.text}</p>
				<p className="text-5xl font-semibold bg-linear-to-b from-white via-white to-transparent bg-clip-text text-transparent">
					{summaryWeather.tempC}
				</p>
				<img src={summaryWeather.icon} alt="" width={82} />
			</div>
			<div className="flex text-white text-sm items-center [&>*:not(:last-child)]:border-r [&>*:not(:last-child)]:border-white [&>*:not(:last-child)]:pr-6 [&>*:not(:first-child)]:pl-6">
				<InfoItem icon={Wind} value={summaryWeather.wind} label="wind" key={"wind"} />
				<InfoItem
					icon={DropletsIcon}
					value={summaryWeather.humidity}
					label="humidity"
					key={"humidity"}
				/>
				<InfoItem
					icon={EyeIcon}
					value={summaryWeather.visibility}
					label="visibility"
					key={"visibility"}
				/>
			</div>
		</div>
	);
}
