import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col } from "react-bootstrap";
import { FeedCard } from "./FeedCard";
import axios from "axios";

import "../style/FeedList.css";
import { FavourType, defaultFavour } from "../types/Favour";

type FeedListProps = {
	filter?: string;
};

export const FeedList = (props: FeedListProps) => {
	const [cards, setCards] = useState([defaultFavour]);

	useEffect(() => {
		if (props.filter) {
			axios
				.get(
					process.env.REACT_APP_API_HOST + "/listings/" + props.filter
				)
				.then((response) => {
					setCards(response.data);
				});
		} else {
			axios
				.get(process.env.REACT_APP_API_HOST + "/favours")
				.then((response) => {
					setCards(response.data);
				});
		}
	}, [props.filter]);

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
