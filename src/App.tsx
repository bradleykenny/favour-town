import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.css";
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

	useEffect(() => {
		// TODO: read in user dynamically
		axios
			.get("http://localhost:5000/profile/" + "bradknny")
			.then((response) => {
				setUser(response.data[0]);
			});
	}, []);

	return (
		<Router>
			<Switch>
				<Route path="/home">
					<NavBar username={user.username} />
					<FavourForm user={user} />
					<FeedList />
				</Route>
				<Route path="/profile/:username">
					<NavBar username="bradknny" />
					<Profile user={user} />
				</Route>
				<Route path="/login">
					<Login />
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
