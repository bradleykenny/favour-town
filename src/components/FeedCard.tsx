import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Card } from "react-bootstrap";

import "../style/FeedCard.css";

type FeedCardProps = {
	username: string;
	title: string;
	text: string;
};

export const FeedCard = (props: FeedCardProps) => {
	const { title, username, text } = props;

	return (
		<Card style={{ width: "32rem" }} className="feedCard">
			<Card.Body>
				<Card.Title>{title}</Card.Title>
				<Card.Subtitle className="mb-2 text-muted">
					@{username}
				</Card.Subtitle>
				<Card.Text>{text}</Card.Text>
			</Card.Body>
		</Card>
	);
};
