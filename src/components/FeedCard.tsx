import React from "react";
import { Card } from "react-bootstrap";

import { FavourType } from "../types/Favour";

import "../style/FeedCard.css";

type FeedCardProps = {
	favour: FavourType;
};

export const FeedCard = (props: FeedCardProps) => {
	const { title, username, description, favour_coins } = props.favour;

	const profileLink = "/profile/" + username;

	return (
		<Card className="feedCard">
			<Card.Header>
				<Card.Link href={profileLink}>@{username}</Card.Link>
			</Card.Header>
			<Card.Body>
				<Card.Title>{title}</Card.Title>
				<Card.Text>{description}</Card.Text>
				<Card.Text>
					<svg
						width="1em"
						height="1em"
						viewBox="0 0 16 16"
						className="coinIcon bi bi-wallet2"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"
						/>
					</svg>

					<b> Coins: </b>
					{favour_coins}
				</Card.Text>
			</Card.Body>
			<Card.Footer>
				<Card.Link href="/">Claim</Card.Link>
				<Card.Link href="/">More</Card.Link>
			</Card.Footer>
		</Card>
	);
};
