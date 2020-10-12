import React, { useState, useEffect } from "react";
import {
	Nav,
	Navbar,
	NavDropdown,
	Form,
	FormControl,
	Button,
} from "react-bootstrap";

import "../style/NavBar.css";

type NavBarProps = {
	username: string;
};

export const NavBar = (props: NavBarProps) => {
	const [username, setUsername] = useState(props.username);

	// This will launch only if propName value has chaged.
	useEffect(() => {
		setUsername(props.username);
	}, [props.username]);

	return (
		<Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
			<Navbar.Brand href="/home">
				<span className="nav_logo">
					<span className="logo_f">favour</span>{" "}
					<span className="logo_t">town</span>
				</span>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto">
					{username ? (
						<Nav.Link href={"/profile/" + username}>
							<svg
								width="1.4em"
								height="1.4em"
								viewBox="0 0 16 16"
								className="navIcon bi bi-person-circle"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
								<path
									fillRule="evenodd"
									d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
								/>
								<path
									fillRule="evenodd"
									d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
								/>
							</svg>
							{username}
						</Nav.Link>
					) : (
						<Nav.Link href={"/login"}>
							<svg
								width="1.4em"
								height="1.4em"
								viewBox="0 0 16 16"
								className="navIcon bi bi-person-circle"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
								<path
									fillRule="evenodd"
									d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
								/>
								<path
									fillRule="evenodd"
									d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
								/>
							</svg>
							Log In
						</Nav.Link>
					)}
					<Nav.Link href="#favours">
						<svg
							width="1.4em"
							height="1.4em"
							viewBox="0 0 16 16"
							className="navIcon bi bi-bag-check-fill"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M5.5 3.5a2.5 2.5 0 0 1 5 0V4h-5v-.5zm6 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zm-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"
							/>
						</svg>
						Favours
					</Nav.Link>
				</Nav>
				<Form inline>
					<FormControl
						type="text"
						placeholder="Search"
						className="mr-sm-2"
					/>
					<Button variant="outline-light">Search</Button>
				</Form>
				<Button variant="outline-light">Logout</Button>
			</Navbar.Collapse>
		</Navbar>
	);
};
