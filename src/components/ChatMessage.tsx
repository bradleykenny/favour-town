import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
	Button,
	Form,
	Container,
	Row,
	Col,
	Card,
	ListGroup,
	ListGroupItem,
	Badge,
} from "react-bootstrap";
import "../style/DirectMessage.css";

type messageProps = {
	message: {
		authorId: 0;
		author: string;
		avatar: string;
		when: string;
		message: string;
	};
};

export const ChatMessage = (props: messageProps) => {
	return (
		<li className="chat-message d-flex justify-content-between mb-4">
			<img
				className="img-circle mr-2 z-depth-1"
				src={props.message.avatar}
				alt="avatar"
				style={{ width: "3rem", height: "3rem" }}
			/>
			<Card>
				<Card.Body>
					<div>
						<strong className="primary-font">
							{props.message.author}
						</strong>
						<small className="pull-right text-muted">
							<i className="far fa-clock" /> {props.message.when}
						</small>
					</div>
					<hr />
					<p className="mb-0">{props.message.message}</p>
				</Card.Body>
			</Card>
		</li>
	);
};
