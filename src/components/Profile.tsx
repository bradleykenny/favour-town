import React from "react";
import { Jumbotron, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { FeedList } from ".";

import "../style/Profile.css";
import { ProfileType } from "../types/Profile";

type ProfileProps = {};

export const Profile = (props: ProfileProps) => {
	const { username } = useParams<{ username: string }>();
	const [firstName, lastName] = ["John", "Test"];

	// TODO: read in user profile picture dynamically
	const profilePicture =
		"https://static.ffx.io/images/$zoom_0.138%2C$multiply_0.4431%2C$ratio_1.5%2C$width_756%2C$x_0%2C$y_0/t_crop_custom/q_86%2Cf_auto/8610f71c3fea808c5a2361ae80e7b7dacd555a39";

	return (
		<div>
			<Jumbotron>
				<Image
					src={profilePicture}
					roundedCircle
					style={{
						height: "100px",
						width: "100px",
						float: "left",
						marginRight: "25px",
					}}
					className="profileImage"
				/>
				<h1>
					{firstName} {lastName}
				</h1>
				<h2>@{username}</h2>
			</Jumbotron>
			<FeedList filter={username} />
		</div>
	);
};
