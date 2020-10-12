import React, { useState, useEffect } from "react";
import {
	Jumbotron,
	Image,
	Form,
	Container,
	Card,
	Col,
	Row,
	Button,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

import "../style/Profile.css";
import { ProfileType } from "../types/Profile";

type EditProfileProps = {
	user: ProfileType;
};

export const EditProfile = (props: EditProfileProps) => {
	const { username } = useParams<{ username: string }>();

	const blankUser: ProfileType = {
		username: "",
		_id: "",
		email_addr: "",
		favour_counter: 0,
	};
	const [user, setUser] = useState(blankUser);

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_API_HOST + "/editProfile/" + username)
			.then((res2: AxiosResponse) => {
				setUser(res2.data[0]);
			});
	}, [username]);

	// TODO: read in user profile picture dynamically
	const profilePicture = "https://robohash.org/" + props.user._id;

	const handleSubmit = () => {};

	const handleChange = () => {};

	return (
		<div>
			<Jumbotron>
				<Image
					src={profilePicture}
					roundedCircle
					className="profileImage"
				/>
				<h1>@{props.user.username}</h1>
				<h3>{props.user.email_addr}</h3>
			</Jumbotron>
			<Container>
				<Row className="d-flex justify-content-center">
					<Col sm={8} className="align-items-center">
						<Card className="editProfileCard">
							<Card.Body>
								<Card.Title className="text-center">
									<h2>Edit profile details</h2>
								</Card.Title>

								<Form onSubmit={handleSubmit}>
									<Form.Group controlId="formUsername">
										<Form.Label>Change username</Form.Label>
										<Form.Control
											name="username"
											type="username"
											placeholder="Enter new username"
										/>
									</Form.Group>
									<Form.Group controlId="formPassword">
										<Form.Label>Change password</Form.Label>
										<Form.Control
											name="password"
											type="password"
											placeholder="Enter new password"
										/>
									</Form.Group>
									<Form.Group controlId="formProfilePic">
										<Form.File
											className="position-relative"
											required
											name="file"
											label="Upload new profile picture"
											onChange={handleChange}
											feedbackTooltip
										/>
									</Form.Group>

									<Button
										variant="primary"
										type="submit"
										className="btn-block"
									>
										Save new changes
									</Button>
								</Form>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};
