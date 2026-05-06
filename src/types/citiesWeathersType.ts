type citiesWeathersType = {
	icon: string;
	name: string;
	tempC: number;
	maxTempC: number;
	minTempC: number;
};

type nowCitiesWeathersType = {
	icon: string;
	name: string;
	tempC: number;
};

type calendarCityForecastType = {
	day: {
		condition: {
			icon: string;
		};
	};
	date: string;
};

export type { citiesWeathersType, nowCitiesWeathersType, calendarCityForecastType };
