import { API } from "./weatherAPI";

const KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function getCurrent(city: string) {
	const response = await API.get("/current.json", {
		params: {
			key: KEY,
			q: city,
			lang: "pt",
		},
	});
	return response.data;
}

export async function getForecast(city: string, days: number) {
	const response = await API.get("/forecast.json", {
		params: {
			key: KEY,
			q: city,
			days,
			lang: "pt",
		},
	});
	return response.data;
}

export async function getAutocomplete(excerpt: string) {
	const response = await API.get("/search.json", {
		params: {
			key: KEY,
			q: excerpt,
		},
	});
	return response.data;
}
