import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import axios, { AxiosResponse } from "axios";

import {
	NavBar,
	FeedList,
	Profile,
	Login,
	Register,
	FavourForm,
} from "./components";
import { ProfileType } from "./types/Profile";

import "./style/App.css";

const App = () => {
	const blankUser: ProfileType = {
		username: "",
		_id: "",
		email_addr: "",
		favour_counter: 0,
	};
	const [user, setUser] = useState(blankUser);
	const [username, setUsername] = useState("");

	useEffect(() => {
		// TODO: read in user dynamically
		axios
			.post(
				process.env.REACT_APP_API_HOST + "/hassession",
				{},
				{
					withCredentials: true,
				}
			)
			.then((res: AxiosResponse) => {
				if (res.data !== "NO") {
					axios
						.get(
							process.env.REACT_APP_API_HOST +
								"/profile/" +
								res.data
						)
						.then((res2: AxiosResponse) => {
							setUser(res2.data[0]);
							setUsername(res2.data[0].username);
						});
				}
			});
	}, [username]);

	console.log(user);

	return (
		<Router>
			<Switch>
				<Route path="/home">
					<NavBar username={user ? user.username : ""} />
					<FavourForm user={user} />
					<FeedList />
				</Route>
				<Route path="/profile/:username">
					<NavBar username={user ? user.username : ""} />
					<Profile />
				</Route>
				<Route path="/login">
					<Login setUsername={setUsername} />
				</Route>
				<Route path="/register">
					<Register />
				</Route>

				{/* ALWAYS LEAVE `/` LAST */}
				<Route path="/">
					<Redirect to="/home" />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
