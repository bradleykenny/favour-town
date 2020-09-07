import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col } from "react-bootstrap";
import { FeedCard } from "./FeedCard";
import axios from "axios";

import "../style/FeedList.css";
import { FavourType, defaultFavour } from "../types/Favour";

type FeedListProps = {};

export const FeedList = (props: FeedListProps) => {
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
						<h2>Favours</h2>
						<br />
						{cards.map((favour: FavourType) => (
							<FeedCard
								title={favour.title}
								text={favour.description}
								username={favour.username}
							/>
						))}
					</div>
				</Col>
			</Row>
		</Container>
	);
};
