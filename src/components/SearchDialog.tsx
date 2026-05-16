import { MapPin, Star } from "lucide-react";
import { useSelectedCity } from "@/contexts/SelectedCityContext";
import { useCitySearch } from "@/hooks/useCitySearch";
import { useFavorites } from "@/hooks/useFavorites";
import { DialogClose, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

export default function SearchDialog() {
	const { query, setQuery, cityList } = useCitySearch();
	const { isFavorited, toggleFavorite } = useFavorites();
	const { changeSelectedCity } = useSelectedCity();

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
				{cityList.map((item) => {
					return (
						<div
							key={item.id}
							className="flex p-2 m-1 justify-between hover:bg-select group rounded-xl cursor-pointer"
							onClick={() => changeSelectedCity(item.city)}
						>
							<div className="flex gap-1 cursor-pointer">
								<MapPin className="text-card-foreground group-hover:-rotate-90 transition-transform group-hover:scale-115" />
								<p className="text-icons">{item.city}</p>
							</div>
							<Star
								onClick={() => toggleFavorite(item.city)}
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
