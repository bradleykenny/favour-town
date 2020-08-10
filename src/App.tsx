import React from "react";
import "./style/App.css";
import 'bootstrap/dist/css/bootstrap.css'; 
import { Nav, Navbar, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';

const App = () => {
	return (
		<div className="App">
			<Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
				<Navbar.Brand href="#home">Favour Town</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link href="#features">Friends</Nav.Link>
					<Nav.Link href="#pricing">Favors</Nav.Link>
					<NavDropdown title="Dropdown" id="collasible-nav-dropdown">
					<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
					<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
					<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
					</NavDropdown>
				</Nav>
				<Form inline>
					<FormControl type="text" placeholder="Search" className="mr-sm-2" />
					<Button variant="outline-light">Search</Button>
				</Form>
				</Navbar.Collapse>
			</Navbar>
			<p>
				Edit <code>src/App.js</code> and save to reload.
			</p>
		</div>
	);
};

export default App;
