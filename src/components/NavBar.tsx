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
		console.log(props.username);
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
							{username}
						</Nav.Link>
					) : (
						<Nav.Link href={"/login"}>Log In</Nav.Link>
					)}
					<Nav.Link href="#favours">Favours</Nav.Link>
					<NavDropdown title="Dropdown" id="collasible-nav-dropdown">
						<NavDropdown.Item href="#action/3.1">
							Action
						</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.2">
							Another action
						</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.3">
							Something
						</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href="#action/3.4">
							Separated link
						</NavDropdown.Item>
					</NavDropdown>
				</Nav>
				<Form inline>
					<FormControl
						type="text"
						placeholder="Search"
						className="mr-sm-2"
					/>
					<Button variant="outline-light">Search</Button>
				</Form>
			</Navbar.Collapse>
		</Navbar>
	);
};
