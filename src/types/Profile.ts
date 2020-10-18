export type ProfileType = {
	username: string;
	_id: string;
	email_addr: string;
	favour_counter: number;
};

export type ExtProfileType = {
	username: string;
	_id: string;
	email_addr: string;
	favour_counter: number;
	f_name: string;
	l_name: string;
	user_rating: number;
};

export const emptyUser: ExtProfileType = {
	username: "",
	_id: "",
	email_addr: "",
	favour_counter: 0,
	f_name: "",
	l_name: "",
	user_rating: 0,
};
