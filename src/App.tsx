import React, { Component } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/NavBar";
import FeedList from "./components/FeedList";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";

import { history } from "./services/history";

import "./style/App.css";

class App extends Component<{ dispatch: any }, {}> {
	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<Router history={history}>
				<Switch>
					<Route path="/home">
						<NavBar />
						<FeedList />
					</Route>
					<Route path="/profile">
						<NavBar />
						<Profile username="bradknny" />
					</Route>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/register">
						<Register />
					</Route>
					<Route path="/">
						<Redirect to="/home" />
					</Route>
				</Switch>
			</Router>
		);
	}
}

export default App;
