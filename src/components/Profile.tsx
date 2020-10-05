import React, { useState, useEffect } from "react";
import { Jumbotron, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

import { FeedList } from ".";

import "../style/Profile.css";
import { ProfileType } from "../types/Profile";

type ProfileProps = {};

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
	const profilePicture =
		"https://static.ffx.io/images/$zoom_0.138%2C$multiply_0.4431%2C$ratio_1.5%2C$width_756%2C$x_0%2C$y_0/t_crop_custom/q_86%2Cf_auto/8610f71c3fea808c5a2361ae80e7b7dacd555a39";

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
			<FeedList filter={username} />
		</div>
	);
};
