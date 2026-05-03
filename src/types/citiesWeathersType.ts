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
}

export type { citiesWeathersType, nowCitiesWeathersType };
