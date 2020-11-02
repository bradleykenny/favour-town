import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FeedCard, UserCard, FavourForm, Legend } from "./";
import axios from "axios";

import "../style/FeedList.css";
import { FavourType, defaultFavour } from "../types/Favour";
import { ProfileType } from "../types/Profile";

type FeedListProps = {
	filter?: string;
	filterType?: number[];
	user: ProfileType;
	userCardShow: boolean;
};

export const FeedList = (props: FeedListProps) => {
	const [cards, setCards] = useState([defaultFavour]);
	const [countCards, setCountCards] = useState(20);
	const [filterType, setFilterType] = useState(props.filterType);
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
					if (props.filterType) {
						const respCards = response.data;
						setCards(
							respCards.filter((resp: FavourType) =>
								filterType?.includes(resp.favour_status)
							)
						);
					} else {
						setCards(response.data);
					}
				});
		} else {
			axios
				.get(
					process.env.REACT_APP_API_HOST +
						"/favours?count=" +
						countCards
				)
				.then((response) => {
					if (props.filterType) {
						const respCards = response.data;
						setCards(
							respCards.filter((resp: FavourType) =>
								filterType?.includes(resp.favour_status)
							)
						);
					} else {
						setCards(response.data);
					}
				});
		}
	}, [props.filter, countCards]);

	// Loads more cards into the feed
	const handleLoadMore = (e: any) => {
		setCountCards(countCards + 20);
	};

	const handleFilter = (e: any) => {
		console.log(e.target.value);
		switch (e.target.value) {
			case "Incomplete":
				window.location.assign("/favours/incomplete");
				break;
			case "Unclaimed":
				window.location.assign("/favours/unclaimed");
				break;
			case "Claimed":
				window.location.assign("/favours/claimed");
				break;
			case "Complete":
				window.location.assign("/favours/complete");
				break;
			default:
				break;
		}
	};

	return (
		<Container>
			<Row
				className="d-flex justify-content-center"
				style={{ marginTop: "50px" }}
			>
				{props.userCardShow && (
					<Col sm={4}>
						<UserCard user={props.user} />
						<Legend />
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
						<Form.Control
							as="select"
							onChange={handleFilter}
							id="feedFilterSelect"
						>
							<option>Choose a filter...</option>
							<option>Incomplete</option>
							<option>Unclaimed</option>
							<option>Claimed</option>
							<option>Complete</option>
						</Form.Control>
						<br />
						{cards.map((favour: FavourType) => (
							<FeedCard favour={favour} user={props.user} />
						))}
					</div>
					<Button onClick={handleLoadMore} className="loadMoreBtn">
						Load More
					</Button>
				</Col>
			</Row>
		</Container>
	);
};
