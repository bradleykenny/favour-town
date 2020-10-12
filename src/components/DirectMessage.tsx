import React, { useState } from "react";
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

type messageProps = {};

export const DirectMessage = (props: messageProps) => {
	const [friends, setFriends] = useState({
		name: "",
		avatar: "",
		message: "",
		when: "",
		unread: 0,
		seen: false,
		active: true,
	});
	const [messages, setMessages] = useState({
		author: "",
		avatar: "",
		when: "",
		message: "",
	});

	setFriends({
		name: "John Doe",
		avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-8",
		message: "Hello, Are you there?",
		when: "Just now",
		unread: 1,
		seen: false,
		active: true,
	});
	// setFriends({
	// 	name: "Danny Smith",
	// 	message: "Lorem ipsum dolor sit",
	// 	avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-1",
	// 	when: "5 min ago",
	// 	unread: 0,
	// 	seen: false,
	// 	active: false,
	// });

	setMessages({
		author: "Brad Pitt",
		avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-6",
		when: "12 mins ago",
		message:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
	});

	// setMessages({
	// 	author: "Lara Croft",
	// 	avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-5",
	// 	when: "13 mins ago",
	// 	message:
	// 		" Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
	// });

	const handleFriends = () => {};

	const handleMessages = () => {};

	const Friend = () => (
		<ListGroupItem
			href="#!"
			className="d-flex justify-content-between p-2
			border-light"
			style={{ backgroundColor: friends.active ? "#eeeeee" : "" }}
		>
			<img
				className="avatar avatar-32 img-circle mr-2 z-depth-1"
				src={friends.avatar}
				alt="avatar"
			/>
			<div style={{ fontSize: "0.95rem" }}>
				<strong>{friends.name}</strong>
				<p className="text-muted">{friends.message}</p>
			</div>
			<div>
				<p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>
					{friends.when}
				</p>
				{friends.seen ? (
					<span className="text-muted float-right">
						<svg
							width="1em"
							height="1em"
							viewBox="0 0 16 16"
							className="bi bi-check"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
							/>
						</svg>
					</span>
				) : friends.unread ? (
					<Badge color="danger" className="float-right">
						{friends.unread}
					</Badge>
				) : (
					<span className="text-muted float-right">
						<svg
							width="1em"
							height="1em"
							viewBox="0 0 16 16"
							className="bi bi-reply-fill"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M9.079 11.9l4.568-3.281a.719.719 0 0 0 0-1.238L9.079 4.1A.716.716 0 0 0 8 4.719V6c-1.5 0-6 0-7 8 2.5-4.5 7-4 7-4v1.281c0 .56.606.898 1.079.62z" />
						</svg>
					</span>
				)}
			</div>
		</ListGroupItem>
	);

	const ChatMessage = () => (
		<li className="chat-message d-flex justify-content-between mb-4">
			<img
				className="avatar avatar-32 img-circle mr-2 z-depth-1"
				src={messages.avatar}
				alt="avatar"
			/>
			<Card>
				<Card.Body>
					<div>
						<strong className="primary-font">
							{messages.author}
						</strong>
						<small className="pull-right text-muted">
							<i className="far fa-clock" /> {messages.when}
						</small>
					</div>
					<hr />
					<p className="mb-0">{messages.message}</p>
				</Card.Body>
			</Card>
		</li>
	);
	return (
		<div>
			<p>Direct Message</p>
			<Container>
				<Card>
					<Row className="px-lg-2 px-2">
						<Col className="px-0 mb-4 mb-md-0">
							<h6 className="font-weight-bold mb-3 text-lg-left">
								Member
							</h6>
							<div className="white z-depth-1 p-3">
								<ListGroup className="friend-list">
									{/* {friends.map((friend) => (
										<Friend
											key={friend.name}
											friend={friend}
										/>
									))} */}
								</ListGroup>
							</div>
						</Col>
						<Col>
							<Row>
								<ListGroup>
									<li>
										<div>
											<textarea placeholder="Type your message here..." />
										</div>
									</li>
								</ListGroup>
							</Row>
						</Col>
					</Row>
				</Card>
			</Container>
		</div>
	);
};
