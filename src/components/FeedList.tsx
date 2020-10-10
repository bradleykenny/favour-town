import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FeedCard, UserCard, FavourForm } from "./";
import axios from "axios";

import "../style/FeedList.css";
import { FavourType, defaultFavour } from "../types/Favour";
import { ProfileType } from "../types/Profile";

type FeedListProps = {
	filter?: string;
	user: ProfileType;
	userCardShow: boolean;
};

export const FeedList = (props: FeedListProps) => {
	const [cards, setCards] = useState([defaultFavour]);
	const [countCards, setCountCards] = useState(20);
	// const [pageCards, setPageCards] = useState(1);

	// Do intial load of cards into the feed
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
					console.log(response.data);
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
					for (const item of response.data) {
						console.log(item);
					}
				});
		}
	}, [props.filter, countCards]);

	// Loads more cards into the feed
	const handleLoadMore = (e: any) => {
		setCountCards(countCards + 20);
	};

	return (
		<Container>
			<Row
				className="d-flex justify-content-center"
				style={{ marginTop: "50px" }}
			>
				{props.userCardShow && (
					<Col sm={4}>
						<UserCard username="bradknny" />
					</Col>
				)}
				<Col sm={6}>
					<div id="feedList">
						{props.userCardShow && <FavourForm user={props.user} />}
						<h2
							style={
								props.userCardShow
									? { marginTop: "40px", marginLeft: "20px" }
									: { marginLeft: "20px" }
							}
						>
							Favours
						</h2>
						<br />
						{cards.map((favour: FavourType) => (
							<FeedCard favour={favour} />
						))}
						<Button onClick={handleLoadMore}>Load More</Button>
					</div>
				</Col>
			</Row>
		</Container>
	);
};
