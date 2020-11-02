import React from "react";
import { Card, ListGroup, ListGroupItem, Image } from "react-bootstrap";
import { ProfileType } from "../types/Profile";

import "../style/FeedCard.css";

type UserCardProps = {
	user: ProfileType;
};

export const UserCard = (props: UserCardProps) => {
	const { user } = props;

	const profileLink = "/profile/" + user.username;
	const profilePicture =
		user.image_link || "https://robohash.org/" + user._id;

	return (
		<Card className="userCard">
			<Card.Header>
				<Image src={profilePicture} className="profilePicture" />
				<Card.Link href={profileLink}>@{user.username}</Card.Link>
			</Card.Header>
			<Card.Body>
				<ListGroup className="list-group-flush">
					<ListGroupItem>
						<svg
							width="1em"
							height="1em"
							viewBox="0 0 16 16"
							className="coinIcon bi bi-envelope"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"
							/>
						</svg>
						<b> Email: </b>
						{user.email_addr}
					</ListGroupItem>
					<ListGroupItem>
						<svg
							width="1em"
							height="1em"
							viewBox="0 0 16 16"
							className="coinIcon bi bi-wallet2"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"
							/>
						</svg>
						<b> Coins: </b>
						{user.favour_counter}
					</ListGroupItem>
				</ListGroup>
			</Card.Body>
		</Card>
	);
};
