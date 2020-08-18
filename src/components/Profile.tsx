import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Jumbotron } from "react-bootstrap";

type ProfileProps = {
	username: string;
};

type ProfileState = {};

export class Profile extends Component<ProfileProps, ProfileState> {
	render() {
		return (
			<Jumbotron>
				<h1>Firstname Lastname</h1>
				<h2>{this.props.username}</h2>
			</Jumbotron>
		);
	}
}
