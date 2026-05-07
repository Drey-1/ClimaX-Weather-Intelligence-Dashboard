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

type deepCityForecastType = {
	date: string;
	day: {
		condition: {
			icon: string;
		};
		mintemp_c: number;
		maxtemp_c: number;
		totalprecip_mm: number;
	};
};

export type { citiesWeathersType, nowCitiesWeathersType, calendarCityForecastType, deepCityForecastType };
