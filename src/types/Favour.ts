export type FavourType = {
	_id: string;
	user_id: string;
	title: string;
	location: string;
	description: string;
	favour_coins: number;
	favour_type: number;
	date: string;
	username: string;
};

export const defaultFavour: FavourType = {
	_id: "",
	user_id: "",
	title: "",
	location: "",
	description: "",
	favour_coins: 0,
	favour_type: 0,
	date: "",
	username: "",
};
