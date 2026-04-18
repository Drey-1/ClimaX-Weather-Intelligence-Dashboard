import { createFileRoute } from "@tanstack/react-router";
import { CloudRainIcon, PlusIcon } from "lucide-react";
import FavoriteCard from "@/components/FavoriteCard";
import SearchDialog from "@/components/SearchDialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

function RouteComponent() {
	const mock = [
		{
			icon: CloudRainIcon,
			city: "New York",
			tempNow: "23°C",
			minTemp: "18°C",
			maxTemp: "24°C",
		},
		{
			icon: CloudRainIcon,
			city: "New York",
			tempNow: "23°C",
			minTemp: "18°C",
			maxTemp: "24°C",
		},
		{
			icon: CloudRainIcon,
			city: "New York",
			tempNow: "23°C",
			minTemp: "18°C",
			maxTemp: "24°C",
		},
		{
			icon: CloudRainIcon,
			city: "New York",
			tempNow: "23°C",
			minTemp: "18°C",
			maxTemp: "24°C",
		},
	];
	return (
		<div className="flex flex-col gap-6">
			<h1 className="text-icons text-xl pl-6 pb-2">Your favorites citys:</h1>
			{mock.map((item) => {
				return (
					<FavoriteCard
						key={item.city}
						icon={item.icon}
						city={item.city}
						tempNow={item.tempNow}
						minTemp={item.minTemp}
						maxTemp={item.maxTemp}
					/>
				);
			})}
			<div className="flex border-2 border-dashed border-card rounded-3xl p-4 gap-6 items-center">
				<Dialog>
					<DialogTrigger asChild className="cursor-pointer">
						<div className="bg-card rounded-xl p-1">
							<PlusIcon size={32} className="text-card-foreground" />
						</div>
					</DialogTrigger>
					<SearchDialog />
				</Dialog>
				<p className="text-3xl text-card-foreground">Add the cities you are interested in</p>
			</div>
		</div>
	);
}

export const Route = createFileRoute("/favorites")({
	component: RouteComponent,
});
