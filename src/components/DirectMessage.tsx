import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
	Button,
	Container,
	Row,
	Col,
	Card,
	ListGroup,
	Form,
	InputGroup,
	FormControl,
} from "react-bootstrap";
import { ChatMessage, Friend } from "../components";
import "../style/DirectMessage.css";
type messageProps = {};

export const DirectMessage = (props: messageProps) => {
	const [newMessage, setNewMessage] = useState("");
	const [state, setState] = useState({
		friends: [
			{
				name: "John Doe",
				avatar: "https://robohash.org/John",
				message: "Hello, Are you there?",
				when: "Just now",
				toRespond: 1,
				seen: false,
				active: true,
			},
			{
				name: "Danny Smith",
				message: "Lorem ipsum dolor sit",
				avatar: "https://robohash.org/Danny",
				when: "5 min ago",
				toRespond: 0,
				seen: false,
				active: false,
			},
			{
				name: "Alex Steward",
				message: "Lorem ipsum dolor sit",
				avatar: "https://robohash.org/Alex",
				when: "Yesterday",
				toRespond: 0,
				seen: false,
				active: false,
			},
			{
				name: "Ashley Olsen",
				message: "Lorem ipsum dolor sit",
				avatar: "https://robohash.org/Ashley",
				when: "Yesterday",
				toRespond: 0,
				seen: false,
				active: false,
			},
			{
				name: "Kate Moss",
				message: "Lorem ipsum dolor sit",
				avatar: "https://robohash.org/Kate",
				when: "Yesterday",
				toRespond: 0,
				seen: false,
				active: false,
			},
			{
				name: "Lara Croft",
				message: "Lorem ipsum dolor sit",
				avatar: "https://robohash.org/Lara",
				when: "Yesterday",
				toRespond: 0,
				seen: false,
				active: false,
			},
			{
				name: "Brad Pitt",
				message: "Lorem ipsum dolor sit",
				avatar: "https://robohash.org/Brad",
				when: "5 min ago",
				toRespond: 0,
				seen: true,
				active: false,
			},
		],
		messages: [
			{
				author: "Brad Pitt",
				avatar: "https://robohash.org/Brad",
				when: "12 mins ago",
				message:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolo",
			},
			{
				author: "Lara Croft",
				avatar: "https://robohash.org/Lara",
				when: "13 mins ago",
				message:
					" Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
			},
			{
				author: "Brad Pitt",
				avatar: "https://robohash.org/Brad",
				when: "14 mins ago",
				message:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dol",
			},
		],
	});

	const handleSubmit = (e: any) => {
		e.preventDefault();
		console.log(newMessage);
		// setState({
		// 	messages: [
		// 		{
		// 			author: "Lara Croft",
		// 			avatar: "https://robohash.org/Lara",
		// 			when: "13 mins ago",
		// 			message: newMessage,
		// 		},
		// 	],
		// });
	};

	const handleChange = (e: any) => {
		e.preventDefault();
		const { name, value } = e.target;
		setNewMessage(value);
	};

	return (
		<Container>
			<Card bg="light" className="directMessageCard">
				<Row className="d-flex justify-content-center mt-2">
					<Col sm={3} className="align-items-center">
						<h3 className="font-weight-bold mb-2 ml-3">Member</h3>
						<div className="white z-depth-1 p-3">
							<ListGroup className="friend-list">
								{state.friends.map((friend: any) => (
									<Friend key={friend.name} friend={friend} />
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

								<div>
									<Form onSubmit={handleSubmit}>
										<Form.Group>
											<Form.Control
												as="textarea"
												name="messageBox"
												className="form-control pl-2 my-0"
												placeholder="Type your message here..."
												onChange={handleChange}
											/>
										</Form.Group>
										<Button
											color="info"
											size="sm"
											type="submit"
											className="float-right mt-2"
										>
											Send
										</Button>
									</Form>
								</div>
							</ListGroup>
						</Row>
					</Col>
				</Row>
			</Card>
		</Container>
	);
};
