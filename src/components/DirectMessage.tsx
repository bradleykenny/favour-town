import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import socketIOClient from "socket.io-client";
import axios, { AxiosResponse } from "axios";
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
const socket = socketIOClient("http://localhost:5000"); //public is the room name

export class DirectMessage extends React.Component {
	state = { 
		yourUsername:"", 
		yourId:"",
		receiverID:"",
		newMessage:"",
		friends:[],
		messages:[],
		ready:false
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
			console.log(msgList);
			this.setState({messages:[...this.state.messages,
					...msgList.map((message: any) => {
						return {
							authorId: message.sender_id,
							author: message.username,
							avatar: message.image_link,
							when: message.date,
							message: message.content,
						};
					})]
				
			});
		});
	
		socket.on("yourUser_id", (credentials: any) => {
			//Set own user id in state
			console.log(credentials)
		
			this.setState({yourId:credentials._id,yourUsername:credentials.username,ready:true})
			
			
			
		});


		socket.on("friendslist", (friendsList: object[]) => {
			//Update list of friends (i.e. people you have recieved messages from or sent messages to). Each object will contain the user_id, username and the last message recieved from them
			console.log(this.state.yourId)
			if(this.state.ready){
				this.setState({friends:[...this.state.friends,
					...friendsList.map((friend: any) => {
						return {
							friendId: friend.receiver_id==this.state.yourId ? friend.sender_id:friend.receiver_id,
							name: friend.username,
							message: friend.content,
							avatar: "https://robohash.org/" + friend.username,
							when: "5 min ago",
							toRespond: 0,
							seen: true,
							active: false,
						}
						
					})]
				
				});
			}
			console.log(this.state.friends)

		});
	}
	
	handleSubmit = (e: any) => {
		console.log(e.target)
		e.preventDefault();
		const message = {
			authorId: this.state.yourId,
			author: this.state.yourUsername,
			avatar: "https://robohash.org/"+this.state.yourUsername,
			reciever: this.state.receiverID, //Get from state:
			when: "now",
			message: this.state.newMessage,
		};
		console.log(message);
		socket.emit("send", message);
		this.setState({messages:[...this.state.messages,message]})

	};

	handleChange = (e: any) => {
		e.preventDefault();
		const { name, value } = e.target;
		this.setState({newMessage:value})
	};


	render(){
		if(this.state.ready){
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
												console.log(this.state.receiverID);

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
		else{
			return (<h1>loading...</h1>);
		}
	}

}
