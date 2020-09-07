import React, { useState } from "react";
import "../style/Register.css";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";

type RegisterProps = {};

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

export const Register = (props: RegisterProps) => {
	const [registerInfo, setRegisterInfo] = useState({
		f_name: "",
		l_name: "",
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({
		f_name: "",
		l_name: "",
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const history = useHistory();

	const handleChange = (e: any) => {
		e.preventDefault();
		const { name, value } = e.currentTarget;

		switch (name) {
			case "f_name":
				if (value.length < 1) {
					setErrors({
						...errors,
						f_name: "First Name cannot be blank!",
					});
					setRegisterInfo({ ...registerInfo, f_name: "" });
				} else {
					errors.f_name = "";
					setErrors({ ...errors, username: "" });
					setRegisterInfo({ ...registerInfo, f_name: value });
				}
				break;

			case "l_name":
				if (value.length < 1) {
					setErrors({
						...errors,
						username: "Last Name cannot be blank!",
					});
					setRegisterInfo({ ...registerInfo, username: "" });
				} else {
					errors.username = "";
					setErrors({ ...errors, username: "" });
					setRegisterInfo({ ...registerInfo, username: value });
				}
				break;

			case "email":
				if (validEmailRegex.test(value)) {
					setErrors({ ...errors, email: "" });
					setRegisterInfo({ ...registerInfo, email: value });
				} else {
					setErrors({ ...errors, email: "Email is not valid!" });
					setRegisterInfo({ ...registerInfo, email: "" });
				}
				break;

			case "password":
				if (value.length < 8) {
					setErrors({
						...errors,
						password: "Password must be 8 characters long!",
					});
					setRegisterInfo({ ...registerInfo, password: "" });
				} else {
					setErrors({ ...errors, password: "" });
					setRegisterInfo({ ...registerInfo, password: value });
				}
				break;

			case "confirmPassword":
				if (value.length < 8) {
					setErrors({
						...errors,
						confirmPassword: "Password must be 8 characters long!",
					});
					setRegisterInfo({ ...registerInfo, confirmPassword: "" });
				} else {
					setErrors({ ...errors, confirmPassword: "" });
					setRegisterInfo({
						...registerInfo,
						confirmPassword: value,
					});
				}
				break;

			default:
				break;
		}
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		// check if password field and confirm password field match
		let passwordsMatch =
			registerInfo.password.localeCompare(
				registerInfo.confirmPassword
			) === 0;
		console.log(passwordsMatch);
		if (validateForm(errors) && passwordsMatch) {
			console.info("Valid Form");
			axios
				.post(
					"http://localhost:5000/register/",
					{
						f_name: registerInfo.f_name,
						l_name: registerInfo.l_name,
						username: registerInfo.username,
						email: registerInfo.email,
						password: registerInfo.password,
						confirmPassword: registerInfo.confirmPassword,
					},
					{ withCredentials: true } //Send cookies with request
				)
				.then(
					(response) => {
						if (response.data === "OK") {
							//TODO: Update session to be logged in with registerInfo/alternatively redirect to login page (not sure)
							alert("Registration Successful");
							history.push("/Login");
						} else {
							//Unsuccessful Registration
						}
					},
					(error) => {
						console.log(error);
					}
				);
		} else if (!passwordsMatch) {
			console.info("Passwords dont match!");
			setErrors({ ...errors, confirmPassword: "Passwords dont match!" });
		} else {
			console.error("Invalid Form");
		}
		console.log("Submit register info: ", registerInfo);
		console.log("Submit error: ", errors);
	};

	return (
		<div
			style={{
				backgroundImage:
					"url(https://www.xmple.com/wallpaper/blue-purple-linear-gradient-1920x1080-c2-ee82ee-40e0d0-a-15-f-14.svg)",
				height: "100%",
				width: "100%",
			}}
		>
			<Container className="align-items-center">
				<Row className="d-flex justify-content-center">
					<Col sm={4} className="align-items-center">
						<Card bg="light" className="loginCard">
							<Card.Body>
								<Card.Title className="text-center">
									<h1>Create Account</h1>
								</Card.Title>
								<Form onSubmit={handleSubmit}>
									<Form.Group controlId="f_name">
										<Form.Label>First Name</Form.Label>
										<Form.Control
											name="f_name"
											type="f_name"
											placeholder="First Name"
											onChange={handleChange}
										/>
										{errors.f_name.length > 0 && (
											<Form.Text className="error">
												{errors.f_name}
											</Form.Text>
										)}
									</Form.Group>
									<Form.Group controlId="l_name">
										<Form.Label>Last Name</Form.Label>
										<Form.Control
											name="l_name"
											type="l_name"
											placeholder="Last Name"
											onChange={handleChange}
										/>
										{errors.l_name.length > 0 && (
											<Form.Text className="error">
												{errors.l_name}
											</Form.Text>
										)}
									</Form.Group>

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

									<Form.Group controlId="formEmail">
										<Form.Label>Email</Form.Label>
										<Form.Control
											name="email"
											type="email"
											placeholder="Email"
											onChange={handleChange}
										/>
										{errors.email.length > 0 && (
											<Form.Text className="error">
												{errors.email}
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
										{errors.confirmPassword.length > 0 && (
											<Form.Text className="error">
												{errors.confirmPassword}
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
		</div>
	);
};
