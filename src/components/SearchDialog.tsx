import { MapPin, Star } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useNotification } from "@/contexts/NotificationContext";
import { useSelectedCity } from "@/contexts/SelectedCityContext";
import { useCitySearch } from "@/hooks/useCitySearch";
import { DialogClose, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

export default function SearchDialog() {
	const { query, setQuery, cityList, isPending, isError } = useCitySearch();
	const { isFavorited, toggleFavorite } = useFavorites();
	const { changeSelectedCity } = useSelectedCity();
	const { notification } = useNotification();

	return (
		<DialogContent showCloseButton={false} className="border border-card">
			<DialogHeader className="border-b border-card p-3">
				<DialogTitle className="flex">
					<input
						type="text"
						placeholder="City Name:"
						className="text-icons w-full  placeholder:text-card-foreground focus:outline-0 caret-icons"
						value={query}
						autoFocus
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setQuery(e.target.value);
						}}
					/>
					<DialogClose asChild>
						<button
							type="button"
							className="text-sm text-card-foreground hover:text-background-secondary border border-card rounded-full px-2 py-1"
						>
							Esc
						</button>
					</DialogClose>
				</DialogTitle>
			</DialogHeader>
			<div className="p-2">
				<h3 className="text-sm p-2">Suggestions</h3>
				{isPending && <p className="text-icons text-xl ">Loading...</p>}
				{isError && (
					<div className="bg-destructive  p-6 rounded-3xl w-max h-max">
						<p className="text-white text-lg">Error loading data.</p>
					</div>
				)}
				{cityList.map((item) => {
					return (
						<div
							key={item.id}
							className="flex p-2 m-1 justify-between hover:bg-select group rounded-xl cursor-pointer"
							onClick={() => {
								changeSelectedCity(item.city);
								notification(`Main city changed to ${item.city}`);
							}}
						>
							<div className="flex gap-1 cursor-pointer">
								<MapPin className="text-card-foreground group-hover:-rotate-90 transition-transform group-hover:scale-115" />
								<p className="text-icons">{item.city}</p>
							</div>
							<Star
								onClick={(e) => {
									e.stopPropagation();
									toggleFavorite(item.city);
									notification(
										`${item.city} ${isFavorited(item.city) ? "was removed from your favorites list" : "has been added to your favorites list"}`,
									);
								}}
								fill={isFavorited(item.city) ? "currentColor" : "none"}
								stroke="currentColor"
								className={"text-icons cursor-pointer"}
							/>
						</div>
					);
				})}
			</div>
		</DialogContent>
	);
}
