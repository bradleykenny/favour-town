import React from "react";
import { Card } from "react-bootstrap";

import "../style/FeedCard.css";

type FeedCardProps = {
	username: string;
	title: string;
	text: string;
};

export const FeedCard = (props: FeedCardProps) => {
	const { title, username, text } = props;

	const profileLink = "/profile/" + username;

	return (
		<Card style={{ width: "32rem" }} className="feedCard">
			<Card.Header>
				<Card.Link href={profileLink}>@{username}</Card.Link>
			</Card.Header>
			<Card.Body>
				<Card.Title>{title}</Card.Title>
				<Card.Text>{text}</Card.Text>
			</Card.Body>
			<Card.Footer>
				<Card.Link href="/">Like</Card.Link>
				<Card.Link href="/">More</Card.Link>
			</Card.Footer>
		</Card>
	);
};
