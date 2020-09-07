import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.css";
import { NavBar, FeedList, Profile, Login, Register } from "./components";
import { ProfileType } from "./types/Profile";

import "./style/App.css";

const App = () => {
	const blankUser: ProfileType = {
		username: "",
		_id: "",
		email_addr: "",
		favour_counter: 0,
		title: "",
	};
	const [user, setUser] = useState(blankUser);

	useEffect(() => {
		axios
			.get("http://localhost:5000/profile/" + "John Test")
			.then((response) => {
				setUser(response.data);
			});
	}, []);

	return (
		<Router>
			<Switch>
				<Route path="/home">
					<NavBar username={user.username} />
					<FeedList />
				</Route>
				<Route path="/profile">
					<NavBar username="sample" />
					<Profile
						user={{
							username: "bradknny",
							_id: "12345",
							email_addr: "example@favourtown.com",
							favour_counter: 100,
							title: "Some title",
						}}
					/>
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
