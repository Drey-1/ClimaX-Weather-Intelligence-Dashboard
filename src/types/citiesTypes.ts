type cityType = {
	id: number;
	name: string;
	region: string;
	country: string;
	lat: number;
	lon: number;
	url: string;
};

type usedCityType = {
	id: number;
	city: string;
	favorited: boolean;
};

export type { cityType, usedCityType };
