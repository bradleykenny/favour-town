import React, { Component } from "react";
import "../style/Login.css";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";

type LoginProps = {
	// userName: string;
	// password: string;
};
type LoginState = boolean;

export class Login extends Component<LoginProps, LoginState> {
	render() {
		return (
			<Container>
				<Row className="d-flex justify-content-center">
					<Col sm={4} className="align-items-center">
						<Card bg="light">
							<Card.Body>
								<Card.Title className="text-center">
									<h1>Login</h1>
								</Card.Title>
								<Form>
									<Form.Group controlId="formUsername">
										<Form.Label>Username</Form.Label>
										<Form.Control
											type="username"
											placeholder="Username"
										/>
									</Form.Group>

									<Form.Group controlId="formPassword">
										<Form.Label>Password</Form.Label>
										<Form.Control
											type="password"
											placeholder="Password"
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
							<Card.Footer>
								<p className="font-small grey-text d-flex justify-content-end">
									Don't have an account?
									<a
										href="/register"
										className="blue-text ml-1"
									>
										Sign Up
									</a>
								</p>
							</Card.Footer>
						</Card>
					</Col>
				</Row>
			</Container>
		);
	}
}
