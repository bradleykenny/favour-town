import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Jumbotron, Image } from "react-bootstrap";

import { FeedList } from ".";

import "../style/Profile.css";

type ProfileProps = {
	user: {
		username: string;
		firstName: string;
		lastName: string;
	};
};

type ProfileState = {};

export class Profile extends Component<ProfileProps, ProfileState> {
	render() {
		const { username, firstName, lastName } = this.props.user;
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
	}
}
