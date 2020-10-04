import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";

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

	const handleSubmit = (e: any) => {
		e.preventDefault();
		axios
			.post(
				process.env.REACT_APP_API_HOST + "/favours/",
				{
					title: title,
					description: description,
					location: location,
					favour_coins: coins,
					type: type,
				},
				{ withCredentials: true }
			)
			.then((res) => {
				alert("Favour posted!");
				setTitle("");
				setDescription("");
				setLocation("");
				setCoins(0);
				setType("");
				setDatetime("");
			});
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

	const handleShowHide = () => {
		setShowForm(!showForm);
	};

	if (props.user) {
		if (showForm) {
			return (
				<div id="favourForm">
					<Modal
						style={{ margin: "auto auto" }}
						show={true}
						onHide={handleShowHide}
					>
						<Modal.Header closeButton>
							<Modal.Title className="text-center">
								<h1>New Favour</h1>
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form>
								<Form.Group controlId="formUsername">
									<Form.Label>Title</Form.Label>
									<Form.Control
										name="title"
										type="text"
										placeholder="Title"
										onChange={handleChange}
									/>
								</Form.Group>

								<Form.Group controlId="formUsername">
									<Form.Label>Description</Form.Label>
									<Form.Control
										name="description"
										type="text"
										placeholder="Description"
										onChange={handleChange}
									/>
								</Form.Group>

								<Form.Group controlId="formUsername">
									<Form.Label>Location</Form.Label>
									<Form.Control
										name="location"
										type="text"
										placeholder="Location"
										onChange={handleChange}
									/>
								</Form.Group>

								<Form.Group controlId="formUsername">
									<Form.Label>Coins</Form.Label>
									<Form.Control
										name="coins"
										type="number"
										placeholder="Coins"
										onChange={handleChange}
									/>
								</Form.Group>

								<Form.Group controlId="formUsername">
									<Form.Label>Type</Form.Label>
									<Form.Control
										as="select"
										name="type"
										placeholder="Type"
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
										placeholder="Date/Time"
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
				</div>
			);
		} else {
			return (
				<Container>
					<Row className="d-flex justify-content-center">
						<Col sm={4} className="align-items-center">
							<Button
								variant="primary"
								type="submit"
								className="btn-block"
								onClick={handleShowHide}
								style={{ marginTop: "25px" }}
							>
								Post a new favour
							</Button>
						</Col>
					</Row>
				</Container>
			);
		}
	} else {
		return <p>Not logged in</p>;
	}
};