import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import socketIOClient from "socket.io-client";
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
const socket = socketIOClient("http://localhost:5000");
var moment = require("moment-timezone");

export class DirectMessage extends React.Component {
	state = {
		yourUsername: "",
		yourId: "",
		receiverID: "",
		newMessage: "",
		friends: [],
		messages: [],
		ready: false,
	};
	componentDidMount() {
		socket.on("NotLoggedIn", (msg: string) => {
			console.log(msg);
			//Redirect to login page
		});

		socket.on("ACK", (msg: string) => {
			console.log(msg);
		});

		socket.on("incoming", (msgList: object[]) => {
			//Update message list state with list of messages

			console.log(msgList);
			this.setState({
				messages: [
					...this.state.messages,
					...msgList.map((message: any) => {
						return {
							authorId: message.sender_id,
							author: message.username,
							avatar: "https://robohash.org/" + message.username,
							when: moment(message.date)
								.tz("Australia/Sydney")
								.format("MMMM Do, h:mm a"),
							message: message.content,
						};
					}),
				],
			});
			console.log(this.state.messages);
		});

		socket.on("yourUser_id", (credentials: any) => {
			//Set own user id in state
			console.log(credentials);

			this.setState({
				yourId: credentials._id,
				yourUsername: credentials.username,
				ready: true,
			});
		});

		socket.on("friendslist", (friendsList: object[]) => {
			//Update list of friends (i.e. people you have recieved messages from or sent messages to). Each object will contain the user_id, username and the last message recieved from them

			this.setState({
				friends: [
					...this.state.friends,
					...friendsList.map((friend: any) => {
						console.log(friend);
						return {
							friendId:
								friend.receiver_id === this.state.yourId
									? friend.sender_id
									: friend.receiver_id,
							name: friend.username,
							message: friend.content,
							avatar: "https://robohash.org/" + friend.username,
							when: "",
							toRespond: 0,
							seen: true,
							active: false,
						};
					}),
				],
			});
		});
	}

	handleSubmit = (e: any) => {
		e.preventDefault();
		const message = {
			authorId: this.state.yourId,
			author: this.state.yourUsername,
			avatar: "https://robohash.org/" + this.state.yourUsername,
			reciever: this.state.receiverID,
			when: "now",
			message: this.state.newMessage,
		};
		socket.emit("send", message);
		this.setState({ messages: [...this.state.messages, message] });
		// reset form after submit
		this.setState({ newMessage: "" });
	};

	handleChange = (e: any) => {
		e.preventDefault();
		const { name, value } = e.target;
		this.setState({ newMessage: value });
	};

	render() {
		if (this.state.ready) {
			return (
				<Container>
					<Card bg="light" className="directMessageCard">
						<Row>
							<Col>
								<h3 className="font-weight-bold mb-2 ml-3 mt-1">
									Chats
								</h3>
								<div className="white z-depth-1 p-3">
									<ListGroup
										className="friend-list"
										id="friends"
									>
										{this.state.friends.map(
											(friend: any) => (
												<Friend
													key={friend.name}
													friend={friend}
													setId={(id: string) => {
														this.setState({
															messages: [],
															receiverID: id,
														});
													}}
													socket={socket}
												/>
											)
										)}
									</ListGroup>
								</div>
							</Col>
							<Col>
								<Row>
									<ListGroup id="messages">
										{this.state.messages
											.filter(
												(message: any) =>
													message.authorId ===
														this.state.yourId ||
													message.authorId ===
														this.state.receiverID
											)
											.map((message: any) => (
												<ChatMessage
													key={
														message.author +
														message.when
													}
													message={message}
													senderId={this.state.yourId}
													receiverId={
														this.state.receiverID
													}
													yourId={this.state.yourId}
												/>
											))}
									</ListGroup>
									<div>
										<Form
											onSubmit={this.handleSubmit}
											id="submitForm"
										>
											<Form.Group>
												<Form.Control
													as="textarea"
													name="messageBox"
													id="textarea"
													value={
														this.state.newMessage
													}
													className="form-control pl-2 my-0"
													placeholder="Type your message here..."
													onChange={this.handleChange}
												/>
											</Form.Group>
											<Button
												color="info"
												size="sm"
												type="submit"
												id="submitBtn"
											>
												Send
												<svg
													width="1em"
													height="1em"
													viewBox="0 0 16 16"
													className="bi bi-cursor-fill ml-1 mb-1"
													fill="currentColor"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														fillRule="evenodd"
														d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"
													/>
												</svg>
											</Button>
										</Form>
									</div>
								</Row>
							</Col>
						</Row>
					</Card>
				</Container>
			);
		} else {
			return <h1>loading...</h1>;
		}
	}
}
