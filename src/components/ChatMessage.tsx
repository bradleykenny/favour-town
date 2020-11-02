import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Card, Col } from "react-bootstrap";
import "../style/DirectMessage.css";

type messageProps = {
	message: {
		authorId: string;
		author: string;
		avatar: string;
		when: string;
		message: string;
	};
	senderId: string;
	receiverId: string;
	yourId: string;
};

export const ChatMessage = (props: messageProps) => {
	var cardPosition: string;
	if (props.message.authorId === props.yourId) {
		cardPosition = "chatMessageCardRight";
	} else {
		cardPosition = "chatMessageCardLeft";
	}
	return (
		<li
			className="chat-message d-flex justify-content-between mb-4 mt-1"
			style={{ float: "right" }}
		>
			<img
				className="img-circle mr-2 z-depth-1"
				src={props.message.avatar}
				alt="avatar"
				style={{ width: "3rem", height: "3rem" }}
			/>
			<Col>
				<Card className={cardPosition} style={{ width: "30rem" }}>
					<Card.Body>
						<div>
							<strong className="primary-font">
								{props.message.author}
							</strong>
							<small className="text-muted">
								<i className="far fa-clock" />{" "}
								{props.message.when}
							</small>
						</div>
						<hr />
						<p className="mb-0">{props.message.message}</p>
					</Card.Body>
				</Card>
			</Col>
		</li>
	);
};
