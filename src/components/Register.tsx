import React, { Component } from "react";
import "../style/Register.css";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";

export class Register extends Component<any> {
	render() {
		return (
			<Container>
				<Row className="d-flex justify-content-center">
					<Col sm={4} className="align-items-center">
						<Card bg="light">
							<Card.Body>
								<Card.Title className="text-center">
									<h1>Create Account</h1>
								</Card.Title>
								<Form>
									<Form.Group controlId="formUsername">
										<Form.Label>Username</Form.Label>
										<Form.Control
											type="username"
											placeholder="Username"
										/>
									</Form.Group>

									<Form.Group controlId="formEmail">
										<Form.Label>Email</Form.Label>
										<Form.Control
											type="email"
											placeholder="Email"
										/>
									</Form.Group>

									<Form.Group controlId="formPassword">
										<Form.Label>Password</Form.Label>
										<Form.Control
											type="password"
											placeholder="Password"
										/>
									</Form.Group>

									<Form.Group controlId="formPassword">
										<Form.Label>
											Confirm Password
										</Form.Label>
										<Form.Control
											type="password"
											placeholder="Confirm Password"
										/>
									</Form.Group>

									<Button
										variant="primary"
										type="submit"
										className="btn-block"
									>
										Register
									</Button>
								</Form>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		);
	}
}
