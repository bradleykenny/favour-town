import React, { Component } from "react";
import "./style/App.css";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/NavBar";
import FeedList from "./components/FeedList";

class App extends Component {
	render() {
		return (
			<div className="App">
				<NavBar />
				<FeedList />
			</div>
		);
	}
}

export default App;
