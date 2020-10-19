import React, { useState, useEffect } from "react";
import { Jumbotron, Image, Button } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

import { FeedList } from ".";

import "../style/Profile.css";
import { ProfileType, ExtProfileType } from "../types/Profile";

type ProfileProps = {
	user: ProfileType;
};

export const Profile = (props: ProfileProps) => {
	const { username } = useParams<{ username: string }>();
	const history = useHistory();

	const blankUser: ExtProfileType = {
		username: "",
		_id: "",
		email_addr: "",
		favour_counter: 0,
		f_name: "",
		l_name: "",
		user_rating: -1,
	};
	const [user, setUser] = useState(blankUser);

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_API_HOST + "/profile/" + username)
			.then((res2: AxiosResponse) => {
				setUser(res2.data[0]);
			});
	}, [username]);

	const profilePicture = "https://robohash.org/" + user._id;

	const handleEdit = () => {
		history.push("/editProfile");
	};

	return (
		<div>
			<Jumbotron>
				<Image
					src={profilePicture}
					roundedCircle
					className="profileImage"
				/>
				<h1>
					{user.f_name} {user.l_name}
				</h1>
				<h3>@{user.username}</h3>
				<p>
					<Button variant="primary" onClick={handleEdit}>
						Edit
					</Button>
				</p>
			</Jumbotron>
			<FeedList
				filter={username}
				user={props.user}
				userCardShow={false}
			/>
		</div>
	);
};
