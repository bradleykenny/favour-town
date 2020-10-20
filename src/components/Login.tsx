import React, { useState } from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../style/Login.css";


type LoginProps = {
	setUsername: Function;
};

const validateForm = (errors: any) => {
	let valid = true;
	Object.values(errors).forEach(
		// if we have an error string set valid to false
		(val: any) => val.length > 0 && (valid = false)
	);
	return valid;
};

export const Login = (props: LoginProps) => {
	const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
	const [errors, setErrors] = useState({ username: "", password: "" });
	const history = useHistory();

	const handleChange = (e: any) => {
		e.preventDefault();
		const { name, value } = e.target;

		switch (name) {
			case "username":
				if (value.length < 5) {
					setErrors({
						...errors,
						username: "Username must be 5 characters long!",
					});
					setLoginInfo({ ...loginInfo, username: "" });
				} else {
					setErrors({
						...errors,
						username: "",
					});
					setLoginInfo({ ...loginInfo, username: value });
				}
				break;

			case "password":
				if (value.length < 8) {
					setErrors({
						...errors,
						password: "Password must be 8 characters long!",
					});
					setLoginInfo({ ...loginInfo, password: "" });
				} else {
					setErrors({
						...errors,
						password: "",
					});
					setLoginInfo({ ...loginInfo, password: value });
				}
				break;

			default:
				break;
		}
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (validateForm(errors)) {
			console.info("Valid Form");
			axios
				.post(
					process.env.REACT_APP_API_HOST + "/login/",
					{
						username: loginInfo.username,
						password: loginInfo.password,
					},
					{ withCredentials: true } //Send cookies with request
				)
				.then(
					(response) => {
						if (response.data !== "ERROR: Login failed") {
							//TODO: Update session to be logged in with response.data
							window.alert(`Logged in as ${loginInfo.username}.`);
							props.setUsername(loginInfo.username);
							history.push("/");
						}
					},
					(error) => {
						console.log(error);
					}
				);
		} else {
			console.error("Invalid Form");
		}

		// Logging
		console.log("Submit username: ", loginInfo.username);
		console.log("Submit password: ", loginInfo.password);
	};

	return (
		<div id="loginBackground">
			<Container>
				<Row className="d-flex justify-content-center">
					<Col sm={4} className="align-items-center">
						<Card bg="light" className="loginCard">
							<Card.Body>
								<Card.Title className="text-center">
									<h2>Login</h2>
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
										{errors.username.length > 0 && (
											<Form.Text className="error">
												{errors.username}
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
										{errors.password.length > 0 && (
											<Form.Text className="error">
												{errors.password}
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
								<p className="font-small grey-text d-flex justify-content-center">
									Don't have an account?
									<Card.Link
										href="/register"
										id="loginRegLink"
									>
										Sign Up
									</Card.Link>
								</p>
							</Card.Footer>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};
