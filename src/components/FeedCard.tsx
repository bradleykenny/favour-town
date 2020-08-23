import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Card } from "react-bootstrap";

import "../style/FeedCard.css";

type FeedCardProps = {
	username: string;
	title: string;
	text: string;
};

type FeedCardState = {};

export class FeedCard extends Component<FeedCardProps, FeedCardState> {
	render() {
		return (
			<Card style={{ width: "32rem" }} className="feedCard">
				<Card.Body>
					<Card.Title>{this.props.title}</Card.Title>
					<Card.Subtitle className="mb-2 text-muted">
						@{this.props.username}
					</Card.Subtitle>
					<Card.Text>{this.props.text}</Card.Text>
				</Card.Body>
			</Card>
		);
	}
}
