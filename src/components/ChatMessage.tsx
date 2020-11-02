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
};

export const ChatMessage = (props: messageProps) => {
	return (
		<li className="chat-message d-flex justify-content-between mb-4 mt-1">
			<img
				className="img-circle mr-2 z-depth-1"
				src={props.message.avatar}
				alt="avatar"
				style={{ width: "3rem", height: "3rem" }}
			/>
			<Col>
				<Card className="chatMessageLeft">
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
