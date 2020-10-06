import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FeedCard } from "./FeedCard";
import axios from "axios";

import "../style/FeedList.css";
import { FavourType, defaultFavour } from "../types/Favour";

type FeedListProps = {
	filter?: string;
};

export const FeedList = (props: FeedListProps) => {
	const [cards, setCards] = useState([defaultFavour]);
	const [countCards, setCountCards] = useState(20);
	const [pageCards, setPageCards] = useState(1);

	useEffect(() => {
		if (props.filter) {
			axios
				.get(
					process.env.REACT_APP_API_HOST +
						"/listings/" +
						props.filter,
					{}
				)
				.then((response) => {
					setCards(response.data);
				});
		} else {
			axios
				.get(
					process.env.REACT_APP_API_HOST +
						"/favours?count=" +
						countCards
				)
				.then((response) => {
					setCards(response.data);
				});
		}
	}, [props.filter, countCards]);

	const handleLoadMore = (e: any) => {
		setCountCards(countCards + 20);
	};

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
						<Button onClick={handleLoadMore}>Load More</Button>
					</div>
				</Col>
			</Row>
		</Container>
	);
};
