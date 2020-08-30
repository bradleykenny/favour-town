import React, { Component } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
	useHistory,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import { NavBar, FeedList, Profile, Login, Register } from "./components";

import "./style/App.css";

const App = () => {
	return (
		<Router>
			<Switch>
				<Route path="/home">
					<NavBar />
					<FeedList />
				</Route>
				<Route path="/profile">
					<NavBar />
					<Profile
						user={{
							username: "bradknny",
							firstName: "Brad",
							lastName: "Kenny",
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
