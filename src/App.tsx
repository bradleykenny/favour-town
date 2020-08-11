import React, { Component } from "react";
import "./style/App.css";
import 'bootstrap/dist/css/bootstrap.css'; 
import NavBar from './components/NavBar';

class App extends Component {
	render() {
		return (
			<div className="App">
				<NavBar />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
			</div>
		); 
	}
}

export default App;
