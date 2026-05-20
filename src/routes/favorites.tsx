import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import FavoriteCard from "@/components/FavoriteCard";
import SearchDialog from "@/components/SearchDialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useFavoritesWeather } from "@/hooks/useFavoritesWeather";

function RouteComponent() {
	const { favorites } = useFavorites();
	const { citiesWeathers } = useFavoritesWeather(favorites);
	return (
		<div className="flex flex-col gap-6">
			<h1 className="text-icons text-xl pl-6 pb-2">Your favorites cities:</h1>
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
				<p className="text-3xl text-card-foreground">Add the cities you are interested in</p>
			</div>
		</div>
	);
}

export const Route = createFileRoute("/favorites")({
	component: RouteComponent,
});
