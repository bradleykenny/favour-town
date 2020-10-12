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
import { ChatMessage, Friend } from "../components";
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
	const [state, setState] = useState({
		friends: [
			{
				name: "John Doe",
				avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-8",
				message: "Hello, Are you there?",
				when: "Just now",
				toRespond: 1,
				seen: false,
				active: true,
			},
			{
				name: "Danny Smith",
				message: "Lorem ipsum dolor sit",
				avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-1",
				when: "5 min ago",
				toRespond: 0,
				seen: false,
				active: false,
			},
			{
				name: "Alex Steward",
				message: "Lorem ipsum dolor sit",
				avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-2",
				when: "Yesterday",
				toRespond: 0,
				seen: false,
				active: false,
			},
			{
				name: "Ashley Olsen",
				message: "Lorem ipsum dolor sit",
				avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-3",
				when: "Yesterday",
				toRespond: 0,
				seen: false,
				active: false,
			},
			{
				name: "Kate Moss",
				message: "Lorem ipsum dolor sit",
				avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-4",
				when: "Yesterday",
				toRespond: 0,
				seen: false,
				active: false,
			},
			{
				name: "Lara Croft",
				message: "Lorem ipsum dolor sit",
				avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-5",
				when: "Yesterday",
				toRespond: 0,
				seen: false,
				active: false,
			},
			{
				name: "Brad Pitt",
				message: "Lorem ipsum dolor sit",
				avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-6",
				when: "5 min ago",
				toRespond: 0,
				seen: true,
				active: false,
			},
		],
		messages: [
			{
				author: "Brad Pitt",
				avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-6",
				when: "12 mins ago",
				message:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolo",
			},
			{
				author: "Lara Croft",
				avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-5",
				when: "13 mins ago",
				message:
					" Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
			},
			{
				author: "Brad Pitt",
				avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-6",
				when: "14 mins ago",
				message:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dol",
			},
		],
	});

	const handleFriends = () => {
		setFriends({
			name: "John Doe",
			avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-8",
			message: "Hello, Are you there?",
			when: "Just now",
			unread: 1,
			seen: false,
			active: true,
		});
		setFriends({
			name: "Danny Smith",
			message: "Lorem ipsum dolor sit",
			avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-1",
			when: "5 min ago",
			unread: 0,
			seen: false,
			active: false,
		});
	};

	const handleMessages = () => {
		setMessages({
			author: "Brad Pitt",
			avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-6",
			when: "12 mins ago",
			message:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
		});

		setMessages({
			author: "Lara Croft",
			avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-5",
			when: "13 mins ago",
			message:
				" Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
		});
	};

	return (
		<div>
			<Container>
				<Card bg="light">
					<Row className="px-lg-2 px-2">
						<Col className="px-0 mb-4 mb-md-0">
							<h6 className="font-weight-bold mb-3 text-lg-left">
								Member
							</h6>
							<div className="white z-depth-1 p-3">
								<ListGroup className="friend-list">
									{state.friends.map((friend: any) => (
										<Friend
											key={friend.name}
											friend={friend}
										/>
									))}
								</ListGroup>
							</div>
						</Col>
						<Col>
							<Row>
								<ListGroup>
									{state.messages.map((message: any) => (
										<ChatMessage
											key={message.author + message.when}
											message={message}
										/>
									))}
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
