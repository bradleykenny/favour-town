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
	FavourInfo,
	DirectMessage,
	EditProfile,
} from "./components";
import { ProfileType } from "./types/Profile";

import "./style/App.css";

const App = () => {
	const blankUser: ProfileType = {
		username: "",
		_id: "",
		email_addr: "",
		favour_counter: 0,
		image_link: "",
	};
	const [user, setUser] = useState(blankUser);
	const [username, setUsername] = useState("");

	useEffect(() => {
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

	return (
		<Router>
			<Switch>
				<Route path="/home">
					<NavBar username={user ? user.username : ""} />
					<FeedList
						user={user}
						userCardShow={user.username ? true : false}
					/>
				</Route>
				<Route path="/profile/:username">
					<NavBar username={user ? user.username : ""} />
					<Profile user={user} />
				</Route>
				<Route path="/favours/incomplete">
					<NavBar username={user ? user.username : ""} />
					<FeedList
						user={user}
						userCardShow={user.username ? true : false}
						filterType={[0, 1]}
					/>
				</Route>
				<Route path="/favours/unclaimed">
					<NavBar username={user ? user.username : ""} />
					<FeedList
						user={user}
						userCardShow={user.username ? true : false}
						filterType={[0]}
					/>
				</Route>
				<Route path="/favours/claimed">
					<NavBar username={user ? user.username : ""} />
					<FeedList
						user={user}
						userCardShow={user.username ? true : false}
						filterType={[1]}
					/>
				</Route>
				<Route path="/favours/complete">
					<NavBar username={user ? user.username : ""} />
					<FeedList
						user={user}
						userCardShow={user.username ? true : false}
						filterType={[2]}
					/>
				</Route>
				<Route path="/favour/:id">
					<NavBar username={user ? user.username : ""} />
					<FavourInfo user={user} />
				</Route>
				<Route path="/login">
					<Login setUsername={setUsername} />
				</Route>
				<Route path="/register">
					<Register />
				</Route>
				<Route path="/message">
					<NavBar username={user ? user.username : ""} />
					<DirectMessage />
				</Route>
				<Route path="/edit/profile">
					<NavBar username={user ? user.username : ""} />
					<EditProfile user={user} />
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
