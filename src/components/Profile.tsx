import React, { useState, useEffect } from "react";
import { Jumbotron, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

import { FeedList } from ".";

import "../style/Profile.css";
import { ProfileType } from "../types/Profile";

type ProfileProps = {
	user: ProfileType;
};

export const Profile = (props: ProfileProps) => {
	const { username } = useParams<{ username: string }>();

	const blankUser: ProfileType = {
		username: "",
		_id: "",
		email_addr: "",
		favour_counter: 0,
	};
	const [user, setUser] = useState(blankUser);

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_API_HOST + "/profile/" + username)
			.then((res2: AxiosResponse) => {
				setUser(res2.data[0]);
			});
	}, [username]);

	// TODO: read in user profile picture dynamically
	const profilePicture = "https://robohash.org/" + user._id;

	return (
		<div>
			<Jumbotron>
				<Image
					src={profilePicture}
					roundedCircle
					className="profileImage"
				/>
				<h1>@{user.username}</h1>
				<h3>{user.email_addr}</h3>
			</Jumbotron>
			<FeedList filter={username} user={props.user} />
		</div>
	);
};
