import { Link } from "@tanstack/react-router";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useSelectedFavoriteCity } from "@/contexts/SelectedFavoriteCityContext";
import { useNowCitiesWeathers } from "@/hooks/useNowCitiesWeathers";
import { Card, CardContent } from "./ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "./ui/carousel";

export default function FavoriteCarousel() {
	const { favorites } = useFavorites();
	const { data: nowCitiesWeathers, isPending, isError } = useNowCitiesWeathers(favorites);
	const { selectedCity, setSelectedCity } = useSelectedFavoriteCity();

	const basis = `basis-1/${Math.min(favorites.length, 5)}`;

	if (isPending)
		return (
			<div>
				<h3 className="flex gap-1 text-icons text-xl pl-6 pb-2">
					<p>Select a city of your</p>
					<Link className="text-accent font-bold" to="/favorites">
						favorite list
					</Link>
					:
				</h3>
				<Carousel opts={{ align: "start" }} className="flex justify-center w-full px-16">
					<CarouselPrevious />
					<CarouselContent>
						<CarouselItem className={`basis-1/3 py-3 w-60`}>
							<div className=" p-1 bg-card h-42 my-12 animate-bounce rounded-2xl"></div>
						</CarouselItem>
						<CarouselItem className={`basis-1/3 py-3 w-60`}>
							<div className="flex justify-center items-center p-1 bg-card h-42 my-12 animate-bounce rounded-2xl">
								<p className="text-icons text-center text-2xl font-bold animate-ping">Loading...</p>
							</div>
						</CarouselItem>
						<CarouselItem className={`basis-1/3 py-3 w-60`}>
							<div className="p-1 bg-card h-42 my-12 animate-bounce rounded-2xl"></div>
						</CarouselItem>
					</CarouselContent>
					<CarouselNext />
				</Carousel>
			</div>
		);

	if (isError)
		return (
			<div className="bg-destructive  p-6 rounded-3xl w-max h-max">
				<p className="text-white text-sm">Error loading data.</p>
			</div>
		);

	return (
		<div>
			<h3 className="flex gap-1 text-icons text-xl pl-6 pb-2">
				<p>Select a city of your</p>
				<Link className="text-accent font-bold" to="/favorites">
					favorite list
				</Link>
				:
			</h3>
			<Carousel opts={{ align: "start" }} className="flex justify-center w-full px-16">
				<CarouselPrevious />
				<CarouselContent>
					{nowCitiesWeathers.map((item) => {
						const isSelected = selectedCity === item.name;

						return (
							<CarouselItem key={item.name} className={`${basis} py-3 w-60`}>
								<div className="p-1">
									<Card
										onClick={() => setSelectedCity(item.name)}
										className={`cursor-pointer transition-all duration-300 ${
											isSelected
												? "ring-2 ring-accent border-accent bg-transparent"
												: "hover:bg-accent"
										}`}
									>
										<CardContent
											className={`flex flex-col aspect-square items-center justify-center p-6 text-center transition-colors ${
												isSelected ? "text-accent" : "text-icons"
											}`}
										>
											<div className="flex gap-2 items-center">
												<img src={item.icon} alt="" />
												<p className="text-2xl font-bold">{item.tempC}°C</p>
											</div>
											<p
												className={`text-xl mt-2 uppercase ${isSelected ? "font-bold" : "font-medium"}`}
											>
												{item.name}
											</p>
										</CardContent>
									</Card>
								</div>
							</CarouselItem>
						);
					})}
				</CarouselContent>
				<CarouselNext />
			</Carousel>
		</div>
	);
}
