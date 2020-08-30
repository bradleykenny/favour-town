import React, { Component, useState } from "react";
import "../style/Login.css";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { Redirect, Router, Route, Link, useHistory } from "react-router-dom";
import ReactDOM, { render } from "react-dom";
import { history } from "../services/history";
import { createPath } from "history";

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
	Object.values(errors).forEach(
		// if we have an error string set valid to false
		(val: any) => val.length > 0 && (valid = false)
	);
	return valid;
};

export class Login extends Component<LoginProps, LoginState> {
	constructor(props: LoginProps) {
		super(props);
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
		return (
			<Container>
				<Row className="d-flex justify-content-center">
					<Col sm={4} className="align-items-center">
						<Card bg="light">
							<Card.Body>
								<Card.Title className="text-center">
									<h1>Login</h1>
								</Card.Title>
								<Form onSubmit={this.handleSubmit}>
									<Form.Group controlId="formUsername">
										<Form.Label>Username</Form.Label>
										<Form.Control
											name="username"
											type="username"
											placeholder="Username"
											onChange={this.handleChange}
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
											onChange={this.handleChange}
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

	handleChange = (e: any) => {
		e.preventDefault();
		const { name, value } = e.target;
		let errors = this.state.errors;
		let loginInfo = this.state;

		switch (name) {
			case "username":
				if (value.length < 5) {
					errors.username = "Username must be 5 characters long!";
					this.setState({ ...loginInfo, username: "" });
				} else {
					errors.username = "";
					this.setState({ ...loginInfo, username: value });
				}
				break;

			case "password":
				if (value.length < 8) {
					errors.password = "Password must be 8 characters long!";
					this.setState({ ...loginInfo, password: "" });
				} else {
					errors.password = "";
					this.setState({ ...loginInfo, password: value });
				}
				break;

			default:
				break;
		}
		// this.setState({ ...errors, [name]: value });
		/* // logging
		console.log("State username ", loginInfo.username);
		console.log("State password ", loginInfo.password);
		*/
	};

	handleSubmit = (e: any) => {
		// console.log("Form submitted: ", loginDetails);
		e.preventDefault();
		if (validateForm(this.state.errors)) {
			console.info("Valid Form");
			axios
				.post("http://localhost:5000/login", {
					username: this.state.username,
					password: this.state.password,
				})
				.then(
					(response) => {
						if (response.statusText == "OK") {
							//TODO: Update session to be logged in with response.data
							console.log(response.data);
							history.push("/home");
						}
					},
					(error) => {
						console.log(error);
					}
				);
		} else {
			console.error("Invalid Form");
		}
		// logging
		console.log("Submit username: ", this.state.username);
		console.log("Submit password: ", this.state.password);
		//console.log("Submit error: ", this.state.errors);
	};
}
