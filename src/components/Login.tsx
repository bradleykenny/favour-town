import React, { Component, useState } from "react";
import "../style/Login.css";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";

type LoginProps = {};
type LoginState = {
	username: string;
	password: string;
	errors: {
		username: string;
		password: string;
	};
};

const validateForm = (errors: any) => {
	let valid = true;
	console.log(errors);
	Object.values(errors).forEach(
		// if we have an error string set valid to false
		(val: any) => val.length > 0 && (valid = false)
	);
	return valid;
};

export class Login extends Component<LoginProps, LoginState> {
	constructor(state: any) {
		super(state);
		this.state = {
			username: "",
			password: "",
			errors: {
				username: "",
				password: "",
			},
		};
	}
	render() {
		// const [loginDetails, setLoginDetails] = useState(state);

		const handleChange = (e: any) => {
			e.preventDefault();
			const { name, value } = e.target;
			let errors = this.state.errors;

			switch (name) {
				case "username":
					errors.username =
						value.length < 5
							? "Username must be 5 characters long!"
							: "";
					break;

				case "password":
					errors.password =
						value.length < 8
							? "Password must be 8 characters long!"
							: "";
					break;

				default:
					break;
			}
			this.setState({ errors, [name]: value });
			// this.setState({ errors, [name]: value }, () => {
			// 	console.log(errors);
			// });
		};

		const handleSubmit = (e: any) => {
			// console.log("Form submitted: ", loginDetails);
			e.preventDefault();
			if (validateForm(this.state.errors)) {
				console.info("Valid Form");
			} else {
				console.error("Invalid Form");
			}
		};

		return (
			<Container>
				<Row className="d-flex justify-content-center">
					<Col sm={4} className="align-items-center">
						<Card bg="light">
							<Card.Body>
								<Card.Title className="text-center">
									<h1>Login</h1>
								</Card.Title>
								<Form onSubmit={handleSubmit}>
									<Form.Group controlId="formUsername">
										<Form.Label>Username</Form.Label>
										<Form.Control
											name="username"
											type="username"
											placeholder="Username"
											onChange={handleChange}
										/>
										{this.state.errors.username.length >
											0 && (
											<Form.Text className="error">
												{this.state.errors.username}
											</Form.Text>
										)}
									</Form.Group>

									<Form.Group controlId="formPassword">
										<Form.Label>Password</Form.Label>
										<Form.Control
											name="password"
											type="password"
											placeholder="Password"
											onChange={handleChange}
										/>
										{this.state.errors.password.length >
											0 && (
											<Form.Text className="error">
												{this.state.errors.password}
											</Form.Text>
										)}
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
