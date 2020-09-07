import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Jumbotron, Image } from "react-bootstrap";

import { FeedList } from ".";

import "../style/Profile.css";
import { ProfileType } from "../types/Profile";

type ProfileProps = {
	user: ProfileType;
};

export const Profile = (props: ProfileProps) => {
	const { username } = props.user;
	const [firstName, lastName] = ["John", "Test"];
	const profilePicture =
		"https://i2-prod.manchestereveningnews.co.uk/incoming/article18777872.ece/ALTERNATES/s1200c/0_pepfrust.jpg";

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
				/>
				<h1>
					{firstName} {lastName}
				</h1>
				<h2>@{username}</h2>
			</Jumbotron>
			<FeedList />
		</div>
	);
};
