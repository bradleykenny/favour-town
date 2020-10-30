import React, { useState } from "react";
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
type messageProps = {};
const socket = socketIOClient("http://localhost:5000"); //public is the room name

export class DirectMessage extends React.Component {
	state = {  
		yourId:"",
		receiverID:"",
		newMessage:"",
		friends:[],
		messages:[]
	}
	componentDidMount(){
		socket.on("NotLoggedIn", (msg: string) => {
			console.log(msg);
			//Redirect to login page
		});
	
		socket.on("ACK", (msg: string) => {
			console.log(msg);
		});
	
		socket.on("incoming", (msgList: object[]) => {
			//Update message list state with list of messages
			
			this.setState({messages:[...this.state.messages,
					...msgList.map((message: any) => {
						return {
							authorId: message.sender_id,
							author: "Brad Pitt",
							avatar: "https://robohash.org/",
							when: message.date,
							message: message.content,
						};
					})]
				
			});
			console.log(this.state.messages)
		});
	
		socket.on("yourUser_id", (your_id: string) => {
			//Set own user id in state
			this.setState({yourId:your_id})
		});
		socket.on("friendslist", (friendsList: object[]) => {
			//Update list of friends (i.e. people you have recieved messages from or sent messages to). Each object will contain the user_id, username and the last message recieved from them

			this.setState({friends:[...this.state.friends,
				...friendsList.map((friend: any) => {
					return {
						friendId: friend.receiver_id,
						name: friend.username,
						message: friend.content,
						avatar: "https://robohash.org/" + friend.username,
						when: "5 min ago",
						toRespond: 0,
						seen: true,
						active: false,
					};
				})]
			
			});

		});
	}
	
	handleSubmit = (e: any) => {
		console.log(e.target)
		e.preventDefault();
		const message = {
			authorId: this.state.yourId,
			author: "Lara Croft",
			avatar: "https://robohash.org/Lara",
			reciever: this.state.receiverID, //Get from state:
			when: "now",
			message: this.state.newMessage,
		};
		console.log(message);
		socket.emit("send", message);
		this.setState({messages:[...this.state.messages,message]})
		console.log(this.state.messages)
	};

	handleChange = (e: any) => {
		e.preventDefault();
		const { name, value } = e.target;
		this.setState({newMessage:value})
	};


	render(){
		return (
			<Container>
				<Card bg="light" className="directMessageCard">
					<Row className="d-flex justify-content-center mt-2">
						<Col sm={3} className="align-items-center">
							<h3 className="font-weight-bold mb-2 ml-3">Member</h3>
							<div className="white z-depth-1 p-3">
								<ListGroup className="friend-list">
									{this.state.friends.map((friend: any) => (
										<Friend
											key={friend.name}
											friend={friend}
											setId={(id:string)=>{
												
												this.setState({messages:[],receiverID:id})
											}}
											socket={socket}
										/>
									))}
								</ListGroup>
							</div>
						</Col>
						<Col>
							<Row>
								<ListGroup>
									{this.state.messages
										.filter(
											(message: any) =>
												message.authorId === this.state.yourId ||
												message.authorId === this.state.receiverID ||
												message.authorId === "0"
										)
										.map((message: any) => (
											<ChatMessage
												key={message.author + message.when}
												message={message}
											/>
										))}
	
									<div>
										<Form onSubmit={this.handleSubmit}>
											<Form.Group>
												<Form.Control
													as="textarea"
													name="messageBox"
													className="form-control pl-2 my-0"
													placeholder="Type your message here..."
													onChange={this.handleChange}
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
	}

}
