import React, { useState, useEffect } from "react";
import { Jumbotron, Image, Button, Form } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

import socketIOClient from "socket.io-client";
import { FeedList } from ".";

import "../style/Profile.css";
import { ProfileType, ExtProfileType } from "../types/Profile";
type ProfileProps = {
	user: ProfileType;
};

export const Profile = (props: ProfileProps) => {
	const { username } = useParams<{ username: string }>();
	const history = useHistory();

	const blankUser: ExtProfileType = {
		username: "",
		_id: "",
		email_addr: "",
		favour_counter: 0,
		f_name: "",
		l_name: "",
		user_rating: -1,
		image_link: "",
	};
	const [user, setUser] = useState(blankUser);

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_API_HOST + "/profile/" + username)
			.then((res2: AxiosResponse) => {
				setUser(res2.data[0]);
			});
	}, [username]);

	const profilePicture =
		user.image_link || "https://robohash.org/" + user._id;

	const handleEdit = () => {
		history.push("/edit/profile");
	};

	return (
		<div>
			<Jumbotron>
				<Image
					src={profilePicture}
					roundedCircle
					className="profileImage"
				/>
				<h1>
					{user.f_name} {user.l_name}
				</h1>
				<h3>@{user.username}</h3>
				<div className="rating">
					{[...Array(5)].map((star, i) => {
						const ratingValue = i + 1;

						return (
							<label>
								<input
									type="radio"
									name="rating"
									value={ratingValue}
								/>
								<svg
									width="1em"
									height="1em"
									viewBox="0 0 16 16"
									className="bi bi-star-fill"
									fill={
										ratingValue <= user.user_rating
											? "#ffc107"
											: "#d4d5d9"
									}
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
								</svg>
							</label>
						);
					})}
					<i className="text-muted ml-2">
						Your rating is: {user.user_rating}
					</i>
				</div>
				<p>
					{props.user._id === user._id && (
						<Button variant="primary" onClick={handleEdit}>
							Edit
						</Button>
					)}
					{props.user._id !== user._id && (
						<Form
							onSubmit={(e: any) => {
								e.preventDefault();

								const socket = socketIOClient(
									"http://localhost:5000"
								);
								socket.emit("send", {
									reciever: user._id,
									author: props.user.username,
									message: e.target["messageBox"].value,
									image_link:
										"https://robohash.org/" +
										props.user.username,
								});
								socket.on("ACK", () => {
									history.push("/message");
									window.location.reload();
								});
							}}
							id="msgFirst"
						>
							<Form.Control
								as="input"
								name="messageBox"
								id="text"
								className="form-control pl-2 my-0"
							/>
							<Button variant="primary" type="submit">
								Message
							</Button>
						</Form>
					)}
				</p>
			</Jumbotron>
			<FeedList
				filter={username}
				user={props.user}
				userCardShow={false}
			/>
		</div>
	);
};
