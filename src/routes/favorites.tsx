import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import FavoriteCard from "@/components/FavoriteCard";
import SearchDialog from "@/components/SearchDialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useFavoritesWeather } from "@/hooks/useFavoritesWeather";

function RouteComponent() {
	const { favorites } = useFavorites();
	const { data: citiesWeathers, isPending, isError } = useFavoritesWeather(favorites);

	if (isPending)
		return (
			<div className="flex flex-col gap-8">
				<h1 className="text-icons text-xl pl-6 pb-2">Your favorites cities:</h1>
				<div className="grid grid-cols-5 gap-12 h-22">
					<div className=" bg-icons rounded-2xl animate-pulse"></div>
					<div className=" bg-icons rounded-2xl animate-pulse"></div>
					<div className=" bg-icons rounded-2xl animate-pulse"></div>
					<div className=" bg-icons rounded-2xl animate-pulse"></div>
					<div className=" bg-icons rounded-2xl animate-pulse"></div>
				</div>
				<div className="grid grid-cols-5 gap-12 h-22">
					<div className=" bg-icons rounded-2xl animate-pulse"></div>
					<div className=" bg-icons rounded-2xl animate-pulse"></div>
					<div className=" bg-icons rounded-2xl animate-pulse"></div>
					<div className=" bg-icons rounded-2xl animate-pulse"></div>
					<div className=" bg-icons rounded-2xl animate-pulse"></div>
				</div>
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

	if (isError)
		return (
			<div className="bg-destructive  p-6 rounded-3xl w-max h-max">
				<p className="text-white text-sm">Error loading data.</p>
			</div>
		);

	return (
		<div className="flex flex-col gap-4 sm:gap-6">
			<h1 className="text-icons text-xl pl-3 sm:pl-6 pb-0 sm:pb-2">Your favorites cities:</h1>
			{citiesWeathers.map((item) => {
				return (
					<FavoriteCard
						key={item.name}
						icon={item.icon}
						name={item.name}
						tempC={item.tempC}
						minTempC={item.minTempC}
						maxTempC={item.maxTempC}
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
				<p className="text-lg sm:text-3xl text-card-foreground">
					Add the cities you are interested in
				</p>
			</div>
		</div>
	);
}

export const Route = createFileRoute("/favorites")({
	component: RouteComponent,
});
