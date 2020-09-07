import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";

import { ProfileType } from "../types/Profile";
import "../style/FavourForm.css";

type FavourFormProps = {
	user: ProfileType;
};

export const FavourForm = (props: FavourFormProps) => {
	const [title, setTitle] = useState("");
	const [location, setLocation] = useState("");
	const [coins, setCoins] = useState(0);
	const [type, setType] = useState("");
	const [datetime, setDatetime] = useState("");

	const [showForm, setShowForm] = useState(false);

	const handleSubmit = (e: any) => {
		e.preventDefault();
	};

	const handleChange = (e: any) => {
		e.preventDefault();
		const { name, value } = e.target;

		switch (name) {
			case "title":
				setTitle(value);
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

	if (props.user) {
		return (
			<Container>
				<Row className="d-flex justify-content-center">
					<Col sm={4} className="align-items-center">
						<div id="favourForm">
							<Card style={{ width: "32rem" }}>
								<Card.Body>
									<Form onSubmit={handleSubmit}>
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
												name="type"
												type="text"
												placeholder="Type"
												onChange={handleChange}
											/>
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

										<Button
											variant="primary"
											type="submit"
											className="btn-block"
										>
											Submit
										</Button>
									</Form>
								</Card.Body>
							</Card>
						</div>
					</Col>
				</Row>
			</Container>
		);
	} else {
		return <p>Out</p>;
	}
};
