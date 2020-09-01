import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col } from "react-bootstrap";
import { FeedCard } from "./FeedCard";
import axios from "axios";

import "../style/FeedList.css";

type FeedListProps = {};

type Favour = {
	_id: string;
	user_id: string;
	title: string;
	location: string;
	description: string;
	favour_coins: number;
	favour_type: number;
	date: string;
};

export const FeedList = (props: FeedListProps) => {
	const defaultFavour: Favour = {
		_id: "",
		user_id: "",
		title: "",
		location: "",
		description: "",
		favour_coins: 0,
		favour_type: 0,
		date: "",
	};
	const [cards, setCards] = useState([defaultFavour]);

	useEffect(() => {
		axios.get("http://localhost:5000/favours").then((response) => {
			setCards(response.data);
		});
	}, []);

	return (
		<Container>
			<Row className="d-flex justify-content-center">
				<Col sm={4} className="align-items-center">
					<div id="feedList">
						{cards.map((favour: Favour) => (
							<FeedCard
								title={favour.title}
								text={favour.description}
								username={favour.user_id}
							/>
						))}
					</div>
				</Col>
			</Row>
		</Container>
	);
};
