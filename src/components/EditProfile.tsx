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
import { ProfileType, ExtProfileType } from "../types/Profile";
import { uploadFile } from "./FileUpload";

type EditProfileProps = {
	user: ProfileType;
};

export const EditProfile = (props: EditProfileProps) => {
	const { username } = useParams<{ username: string }>();
	const [profileInfo, setProfileInfo] = useState({
		location: "",
		password: "",
		profilePicture: "",
	});

	const blankUser: ExtProfileType = {
		username: "",
		_id: "",
		email_addr: "",
		favour_counter: 0,
		f_name: "",
		l_name: "",
		user_rating: 4,
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

	const handleSubmit = (e: any) => {
		e.preventDefault();
		console.log(profileInfo);
		uploadFile(profileInfo.profilePicture);
	};

	const handleChange = (e: any) => {
		e.preventDefault();
		const { name, value } = e.target;

		switch (name) {
			case "location":
				if (value.length > 0) {
					setProfileInfo({ ...profileInfo, location: value });
				}

				break;

			case "password":
				if (value.length > 0) {
					setProfileInfo({ ...profileInfo, password: value });
				}
				break;

			case "file":
				setProfileInfo({
					...profileInfo,
					profilePicture: e.target.files[0],
				});
				break;

			default:
				break;
		}
	};

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
									<Form.Group controlId="formLocation">
										<Form.Label>Change location</Form.Label>
										<Form.Control
											name="location"
											type="location"
											placeholder="Enter new location"
											onChange={handleChange}
										/>
									</Form.Group>
									<Form.Group controlId="formPassword">
										<Form.Label>Change password</Form.Label>
										<Form.Control
											name="password"
											type="password"
											placeholder="Enter new password"
											onChange={handleChange}
										/>
									</Form.Group>
									<Form.Group controlId="formProfilePic">
										<Form.File
											className="position-relative"
											required
											name="file"
											label="Upload new profile picture"
											accept=".png, .jpg, .jpeg"
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
