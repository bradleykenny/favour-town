import React from "react";
import { Card } from "react-bootstrap";

import "../style/FeedCard.css";

type UserCardProps = {
	username: string;
};

export const UserCard = (props: UserCardProps) => {
	const { username } = props;

	const profileLink = "/profile/" + username;

	return (
		<Card className="feedCard">
			<Card.Header>
				<Card.Link href={profileLink}>@{username}</Card.Link>
			</Card.Header>
			<Card.Body>
				<Card.Text>Some more stuff coming here soon.</Card.Text>
			</Card.Body>
		</Card>
	);
};
