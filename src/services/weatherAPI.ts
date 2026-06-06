import axios from "axios";

const URL = "https://api.weatherapi.com/v1";

export const API = axios.create({
	baseURL: URL,
	timeout: 5000,
});
