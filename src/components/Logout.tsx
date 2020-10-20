import axios from "axios";

export const Logout = (e: any) => {
	axios
		.post(
			process.env.REACT_APP_API_HOST + "/logout",
			{},
			{ withCredentials: true }
		)
		.then(
			(response) => {
				if (response.data === "OK") {
					window.location.assign("/");
					window.alert("Logout Succesful. Please Login Again.");
				}
			},
			(error) => {
				console.error(error);
			}
		);
};
