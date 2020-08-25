import React, { Component } from "react";
import "../style/Register.css";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";

type LoginProps = {};
type LoginState = {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
	errors: {
		username: string;
		email: string;
		password: string;
		confirmPassword: string;
	};
};
const validEmailRegex = RegExp(
	/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const validateForm = (errors: any) => {
	let valid = true;
	Object.values(errors).forEach(
		// if we have an error string set valid to false
		(val: any) => val.length > 0 && (valid = false)
	);
	return valid;
};

export class Register extends Component<LoginProps, LoginState> {
	constructor(state: any) {
		super(state);
		this.state = {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
			errors: {
				username: "",
				email: "",
				password: "",
				confirmPassword: "",
			},
		};
	}
	render() {
		const handleChange = (e: any) => {
			e.preventDefault();
			const { name, value } = e.currentTarget;
			let errors = this.state.errors;

			switch (name) {
				case "username":
					errors.username =
						value.length < 5
							? "Username must be 5 characters long!"
							: "";
					break;

				case "email":
					errors.email = validEmailRegex.test(value)
						? ""
						: "Email is not valid!";
					break;

				case "password":
					errors.password =
						value.length < 8
							? "Password must be 8 characters long!"
							: "";
					break;

				case "confirmPassword":
					errors.confirmPassword =
						value.length < 8
							? "Password must be 8 characters long!"
							: "";
					break;

				default:
					break;
			}
			this.setState({ ...errors, [name]: value });
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
									<h1>Create Account</h1>
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

									<Form.Group controlId="formEmail">
										<Form.Label>Email</Form.Label>
										<Form.Control
											name="email"
											type="email"
											placeholder="Email"
											onChange={handleChange}
										/>
										{this.state.errors.email.length > 0 && (
											<Form.Text className="error">
												{this.state.errors.email}
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

									<Form.Group controlId="formConfirmPassword">
										<Form.Label>
											Confirm Password
										</Form.Label>
										<Form.Control
											name="confirmPassword"
											type="password"
											placeholder="Confirm Password"
											onChange={handleChange}
										/>
										{this.state.errors.confirmPassword
											.length > 0 && (
											<Form.Text className="error">
												{
													this.state.errors
														.confirmPassword
												}
											</Form.Text>
										)}
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
							<Card.Footer>
								<p className="font-small grey-text d-flex justify-content-end">
									Already have an account?
									<a href="/login" className="blue-text ml-1">
										Login
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
