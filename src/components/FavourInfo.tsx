import React, { useState, useEffect } from "react";
import {
	Card,
	ListGroup,
	ListGroupItem,
	Container,
	Row,
	Col,
	Button,
} from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

import { defaultFavour } from "../types/Favour";
import { ProfileType, emptyUser } from "../types/Profile";
import { BsChat, BsPlusCircle, BsDashCircle, BsPencil } from "react-icons/bs";

import "../style/FeedCard.css";

type FavourInfoProps = {
	user: ProfileType;
};

type FRequest = {
	favour_id: string;
	user_id: string;
	f_name: string;
	l_name: string;
	username: string;
};

const defaultRequest: FRequest = {
	favour_id: "",
	user_id: "",
	f_name: "",
	l_name: "",
	username: "",
};

export const FavourInfo = (props: FavourInfoProps) => {
	const { id } = useParams<{ id: string }>();

	const [favour, setFavour] = useState(defaultFavour);
	const [requests, setRequests] = useState([defaultRequest]);
	const [assignedUser, setAssignedUser] = useState(emptyUser);

	const history = useHistory();

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_API_HOST + "/favours/" + id)
			.then((response) => {
				setFavour(response.data[0]);
				if (
					response.data[0].favour_status === 1 ||
					response.data[0].favour_status === 2
				) {
					axios
						.get(
							process.env.REACT_APP_API_HOST +
								"/profile/" +
								response.data[0].assigned_user_id
						)
						.then((result) => {
							setAssignedUser(result.data[0]);
						});
				}
			});

		axios
			.post(
				process.env.REACT_APP_API_HOST + "/favours/request/list",
				{
					favour_id: id,
				},
				{ withCredentials: true }
			)
			.then((response) => {
				if (response.data !== "Not logged in!") {
					setRequests(response.data);
				}
			});
	}, [id]);

	const handleAccept = (favour_id: string, requestor: string) => {
		axios
			.post(
				process.env.REACT_APP_API_HOST + "/favours/request/accept",
				{
					favour_id: favour_id,
					requestor: requestor,
				},
				{ withCredentials: true }
			)
			.then(() => {
				window.location.assign("/favour/" + favour_id);
			});
	};

	const handleReject = (favour_id: string, requestor: string) => {
		axios
			.post(
				process.env.REACT_APP_API_HOST + "/favours/request/reject",
				{
					favour_id: favour_id,
					requestor: requestor,
				},
				{ withCredentials: true }
			)
			.then(() => {
				window.location.assign("/favour/" + favour_id);
			});
	};

	const handleComplete = (favour_id: string, requestor: string) => {
		axios
			.post(
				process.env.REACT_APP_API_HOST + "/favours/complete",
				{
					favour_id: favour_id,
					requestor: requestor,
				},
				{ withCredentials: true }
			)
			.then(() => {
				window.location.assign("/favour/" + favour_id);
			});
	};

	const profileLink = "/profile/" + favour.username;

	return (
		<Container>
			<Row
				className="d-flex justify-content-center"
				style={{ marginTop: "50px" }}
			>
				<Col sm={6}>
					<Card className="feedCard singleCard">
						<Card.Header>
							<Card.Link href={profileLink}>
								@{favour.username}
							</Card.Link>
						</Card.Header>
						<Card.Body>
							<ListGroup className="list-group-flush">
								<ListGroupItem>
									<Card.Title>{favour.title}</Card.Title>
									<Card.Text>{favour.description}</Card.Text>
								</ListGroupItem>
								<ListGroupItem>
									<svg
										width="1em"
										height="1em"
										viewBox="0 0 16 16"
										className="coinIcon bi bi-geo"
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill-rule="evenodd"
											d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"
										/>
									</svg>

									<b> Location: </b>
									{favour.location}
								</ListGroupItem>
								<ListGroupItem>
									<svg
										width="1em"
										height="1em"
										viewBox="0 0 16 16"
										className="coinIcon bi bi-wallet2"
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill-rule="evenodd"
											d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"
										/>
									</svg>

									<b> Coins: </b>
									{favour.favour_coins}
								</ListGroupItem>
								{favour.favour_status === 1 && (
									<>
										<ListGroupItem>
											<i>Claimed by</i>{" "}
											<Card.Link
												href={
													"/profile/" +
													assignedUser.username
												}
											>
												{assignedUser.f_name +
													" " +
													assignedUser.l_name +
													"[@" +
													assignedUser.username +
													"]"}
											</Card.Link>
										</ListGroupItem>
										<ListGroupItem>
											<Card.Link
												onClick={() =>
													handleComplete(
														favour._id,
														favour.assigned_user_id ||
															""
													)
												}
											>
												Mark as complete
											</Card.Link>
										</ListGroupItem>
									</>
								)}
								{favour.favour_status === 2 && (
									<ListGroupItem>
										<i>Completed by</i>{" "}
										<Card.Link
											href={
												"/profile/" +
												assignedUser.username
											}
										>
											{assignedUser.f_name +
												" " +
												assignedUser.l_name +
												" [@" +
												assignedUser.username +
												"]"}
										</Card.Link>
									</ListGroupItem>
								)}

								{props.user.username === favour.username && (
									<ListGroupItem>
										{/* Allow user to edit their own favours. */}
										<Card.Link>
											<BsPencil />
											<b>Edit</b>
										</Card.Link>
									</ListGroupItem>
								)}
							</ListGroup>
						</Card.Body>
					</Card>
					{favour.favour_status === 0 &&
						favour.user_id === props.user._id &&
						requests.map((r: FRequest) => (
							<Card className="feedCard requestCard">
								<Card.Body>
									<Card.Text>
										{r.f_name} {r.l_name}
									</Card.Text>
									<Card.Link href={"/profile/" + r.username}>
										@{r.username}
									</Card.Link>
								</Card.Body>
								<Card.Footer>
									<Card.Link
										onClick={() =>
											handleAccept(r.favour_id, r.user_id)
										}
									>
										<BsPlusCircle />
										<b>Accept</b>
									</Card.Link>
									<Card.Link
										onClick={() =>
											handleReject(r.favour_id, r.user_id)
										}
									>
										<BsDashCircle />
										Reject
									</Card.Link>
									<Card.Link>
										<BsChat />
										Message
									</Card.Link>
								</Card.Footer>
							</Card>
						))}
				</Col>
			</Row>
		</Container>
	);
};
