import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { ProfileType } from "../types/Profile";
import "../style/FavourForm.css";

type FavourFormProps = {
	user: ProfileType;
};

export const FavourForm = (props: FavourFormProps) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [location, setLocation] = useState("");
	const [coins, setCoins] = useState(0);
	const [type, setType] = useState("");
	const [datetime, setDatetime] = useState("");

	const [showForm, setShowForm] = useState(false);
	const history = useHistory();
	const handleSubmit = (e: any) => {
		e.preventDefault();
		console.log(title, description, location, coins, type, datetime);
		axios
			.post(
				process.env.REACT_APP_API_HOST + "/favours",
				{
					title: title,
					description: description,
					location: location,
					favour_coins: coins,
					type: type,
					datetime: datetime,
				},
				{ withCredentials: true }
			)
			.then(
				(response) => {
					console.log(response);
					if (response.data === "OK") {
						alert("Favour Posted Succesfully");
						history.push("/");
					}
				},
				(error) => {
					console.log(error);
				}
			);
	};
	const handleChange = (e: any) => {
		e.preventDefault();
		const { name, value } = e.target;

		switch (name) {
			case "title":
				setTitle(value);
				break;
			case "description":
				setDescription(value);
				break;
			case "location":
				setLocation(value);
				break;
			case "coins":
				setCoins(value);
				break;
			case "type":
				setType(value);
				break;
			case "datetime":
				setDatetime(value);
				break;
			default:
				break;
		}
	};

	const handleLocation = (e: any) => {
		setLocation(e.value.description);
	};

	const handleShowHide = () => {
		setShowForm(!showForm);
	};

	if (props.user.username !== "") {
		if (showForm) {
			return (
				<Modal
					style={{ margin: "auto auto" }}
					show={true}
					onHide={handleShowHide}
				>
					<Modal.Header closeButton>
						<Modal.Title>New Favour</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group controlId="formUsername">
								<Form.Label>Title</Form.Label>
								<Form.Control
									name="title"
									type="text"
									placeholder="Enter a title..."
									onChange={handleChange}
								/>
							</Form.Group>

							<Form.Group controlId="formUsername">
								<Form.Label>Description</Form.Label>
								<Form.Control
									name="description"
									as="textarea"
									placeholder="Enter a description..."
									onChange={handleChange}
								/>
							</Form.Group>

							<Form.Group controlId="formUsername">
								<Form.Label>Location</Form.Label>
								<GooglePlacesAutocomplete
									apiKey="AIzaSyBT2ahmrpwBI5acSuxtIa-js55Ah33YVkM"
									autocompletionRequest={{
										types: ["(cities)"],
										componentRestrictions: {
											country: ["au"],
										},
									}}
									selectProps={{
										name: "location",
										onChange: handleLocation,
										placeholder: "Enter the location...",
									}}
								/>
							</Form.Group>

							<Form.Group controlId="formUsername">
								<Form.Label>Coins</Form.Label>
								<Form.Control
									name="coins"
									type="number"
									placeholder="Enter the number of coins earned for completing this favour."
									onChange={handleChange}
								/>
							</Form.Group>

							<Form.Group controlId="formUsername">
								<Form.Label>Type</Form.Label>
								<Form.Control
									as="select"
									name="type"
									onChange={handleChange}
								>
									<option value="request">Request</option>
									<option value="offer">Offer</option>
								</Form.Control>
							</Form.Group>

							<Form.Group controlId="formUsername">
								<Form.Label>Date/Time</Form.Label>
								<Form.Control
									name="datetime"
									type="datetime-local"
									onChange={handleChange}
								/>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="secondary"
							type="submit"
							onClick={handleShowHide}
						>
							Close
						</Button>
						<Button
							variant="primary"
							type="submit"
							onClick={handleSubmit}
						>
							Submit
						</Button>
					</Modal.Footer>
				</Modal>
			);
		} else {
			return (
				<Container>
					<Row className="d-flex justify-content-center">
						<Col sm={6} className="align-items-center">
							<Button
								variant="primary"
								type="submit"
								className="btn-block"
								onClick={handleShowHide}
								block
							>
								Post a new favour
							</Button>
						</Col>
					</Row>
				</Container>
			);
		}
	} else {
		return (
			<Container>
				<Row className="d-flex justify-content-center">
					<Col sm={6} className="align-items-center">
						<Button
							variant="primary"
							type="submit"
							className="btn-block"
							href="/login"
							block
						>
							Log In
						</Button>
					</Col>
				</Row>
			</Container>
		);
	}
};
