import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import socketIOClient from "socket.io-client";
import { Redirect } from "react-router-dom";
import {
	Button,
	Container,
	Row,
	Col,
	Card,
	ListGroup,
	Form,
} from "react-bootstrap";
import { ChatMessage, Friend } from "../components";
import "../style/DirectMessage.css";
type messageProps = {
//	user_id:string;
};
const socket = socketIOClient("http://localhost:5000"); //public is the room name

export const DirectMessage = (props: messageProps) => {
	const [yourId, setYourId] = useState("");
	// user you are messaging's id
	const [receiverID, setReceiverID] = useState(0);
	const [newMessage, setNewMessage] = useState("");
	const [friends, setFriends] = useState([
		{
			friendId: 0,
			name: "Lara Croft",
			message: "Lorem ipsum dolor sit",
			avatar: "https://robohash.org/Lara",
			when: "Yesterday",
			toRespond: 0,
			seen: false,
			active: false,
		},
		{
			friendId: 1,
			name: "Brad Pitt",
			message: "Lorem ipsum dolor sit",
			avatar: "https://robohash.org/Brad",
			when: "5 min ago",
			toRespond: 0,
			seen: true,
			active: false,
		},
	]);
	const [messages, setMessages] = useState([
		{
			authorId: 1,
			author: "Brad Pitt",
			avatar: "https://robohash.org/Brad",
			when: "12 mins ago",
			message:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolo",
		},
		{
			authorId: 0,
			author: "Lara Croft",
			avatar: "https://robohash.org/Lara",
			when: "13 mins ago",
			message:
				" Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
		},
		{
			authorId: 1,
			author: "Brad Pitt",
			avatar: "https://robohash.org/Brad",
			when: "14 mins ago",
			message:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dol",
		},
	]);

	socket.on("NotLoggedIn", (msg: string) => {
		console.log(msg);
		//Redirect to login page
	});

	socket.on("ACK", (msg: string) => {
		console.log(msg);
	});

	socket.on("incoming", (msgList: object[]) => {
		//Update message list state with list of messages
	});

	socket.on("yourUser_id", (your_id: string) => {
		//Set own user id in state
		setYourId(your_id);
	});
	socket.on("friendslist", (friendsList: object[]) => {
		//Update list of friends (i.e. people you have recieved messages from or sent messages to). Each object will contain the user_id, username and the last message recieved from them
		
		setFriends(friends.concat(
			friendsList.map((friend: any) =>{
					return {
						friendId: friend.receiver_id,
						name: friend.username,
						message: friend.content,
						avatar: "https://robohash.org/" + friend.username,
						when: "5 min ago",
						toRespond: 0,
						seen: true,
						active: false,
					}

			})
		))
	});

	const handleSubmit = (e: any) => {
		e.preventDefault();
		const message = {
			authorId: 0,
			author: "Lara Croft",
			avatar: "https://robohash.org/Lara",
			reciever: receiverID,  //Get from state: 
			when: "now", 
			message: newMessage,
		};
		console.log(message)
		socket.emit("send",message)
		setMessages([...messages, message]);
		
		
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
								{friends.map((friend: any) => (
									<Friend
										key={friend.name}
										friend={friend}
										setId={setReceiverID}
									/>
								))}
							</ListGroup>
						</div>
					</Col>
					<Col>
						<Row>
							<ListGroup>
								{messages
									.filter(
										(message: any) =>
											message.authorId === yourId ||
											message.authorId === receiverID ||
											message.authorID === 0
									)
									.map((message: any) => (
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
