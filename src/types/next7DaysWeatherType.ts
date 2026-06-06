type receivedNext7DaysWeatherType = {
	date: string;
	day: {
		condition: {
			text: string;
			icon: string;
		};
		mintemp_c: number;
		maxtemp_c: number;
	};
};

type next7DaysWeatherType = {
	text: string;
	icon: string;
	dayOfWeek: string;
	minTempC: string;
	maxTempC: string;
};

export type { receivedNext7DaysWeatherType, next7DaysWeatherType };
