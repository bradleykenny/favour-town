import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { ChatMessage, Friend } from "../components";
import "../style/DirectMessage.css";
type messageProps = {};

export const DirectMessage = (props: messageProps) => {
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
									<textarea
										className="form-control pl-2 my-0"
										placeholder="Type your message here..."
									/>
									<Button
										color="info"
										size="sm"
										className="float-right mt-4"
									>
										Send
									</Button>
								</div>
							</ListGroup>
						</Row>
					</Col>
				</Row>
			</Card>
		</Container>
	);
};
