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
	assigned_user_id: string | undefined;
	favour_status: 0 | 1 | 2;
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
	assigned_user_id: undefined,
	favour_status: 0,
};
