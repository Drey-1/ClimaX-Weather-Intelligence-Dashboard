type receivedWholeTodayWeatherType = {
	time: string;
	temp_c: number;
	humidity: number;
	precip_mm: number;
};

type WholeTodayWeatherType = {
	time: string;
	tempC: number;
	humidity: number;
	rainfall: number;
};

export type { receivedWholeTodayWeatherType, WholeTodayWeatherType };
