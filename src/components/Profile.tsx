import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Jumbotron, Image } from "react-bootstrap";

import { FeedList } from ".";

type ProfileProps = {
	username: string;
};

type ProfileState = {};

export class Profile extends Component<ProfileProps, ProfileState> {
	render() {
		return (
			<div>
				<Jumbotron>
					<Image
						src="https://i2-prod.manchestereveningnews.co.uk/incoming/article18777872.ece/ALTERNATES/s1200c/0_pepfrust.jpg"
						roundedCircle
						style={{
							height: "100px",
							width: "100px",
							float: "left",
							marginRight: "25px",
						}}
					/>
					<h1>Firstname Lastname</h1>
					<h2>{this.props.username}</h2>
				</Jumbotron>
				<FeedList />
			</div>
		);
	}
}
