import { CloudSunRainIcon } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Link } from "@tanstack/react-router";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "./ui/carousel";

const mock = [
	{
		city: "New York",
		temp: "25°C",
		Icon: CloudSunRainIcon,
	},
	{
		city: "Paris",
		temp: "22°C",
		Icon: CloudSunRainIcon,
	},
	{
		city: "London",
		temp: "18°C",
		Icon: CloudSunRainIcon,
	},
	{
		city: "Moscou",
		temp: "20°C",
		Icon: CloudSunRainIcon,
	},
	{
		city: "Torronto",
		temp: "11°C",
		Icon: CloudSunRainIcon,
	},
	{
		city: "Vancouver",
		temp: "17°C",
		Icon: CloudSunRainIcon,
	},
	{
		city: "Rio de Janeiro",
		temp: "33°C",
		Icon: CloudSunRainIcon,
	},
];

export default function FavoriteCarousel() {
    const [selectedCity, setSelectedCity] = useState(mock[0].city);

    return (
        <div>
            <h3 className="text-icons text-xl pl-6 pb-2">Select a city of your <Link className="text-accent font-bold" to="/favorites">favorite list</Link>:</h3>
            <Carousel
                opts={{ align: "start" }}
                className="flex justify-center w-full px-16"
            >
                <CarouselPrevious />
                <CarouselContent>
                    {mock.map((item) => {
                        const isSelected = selectedCity === item.city;

                        return (
                            <CarouselItem key={item.city} className="basis-1/5 py-3 px-6">
                                <div className="p-1">
                                    <Card 
                                        onClick={() => setSelectedCity(item.city)}
                                        className={`cursor-pointer transition-all duration-300 ${
                                            isSelected 
                                            ? "ring-2 ring-accent border-accent bg-transparent scale-110" 
                                            : "hover:bg-accent"
                                        }`}
                                    >
                                        <CardContent
                                            className={`flex flex-col aspect-square items-center justify-center p-6 text-center transition-colors ${
                                                isSelected ? "text-accent" : "text-icons"
                                            }`}
                                        >
                                            <div className="flex gap-2 items-center">
                                                <item.Icon size={38} />
                                                <p className="text-2xl font-bold">{item.temp}</p>
                                            </div>
                                            <p className={`text-xl mt-2 uppercase ${isSelected ? "font-bold" : "font-medium"}`}>
                                                {item.city}
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
