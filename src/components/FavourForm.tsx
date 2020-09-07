import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Card } from "react-bootstrap";

import "../style/FeedCard.css";
import { ProfileType } from "../types/Profile";

type FavourFormProps = {
	user: ProfileType;
};

export const FavourForm = (props: FavourFormProps) => {
	if (props.user) {
		return (
			<Card style={{ width: "32rem" }} className="feedCard">
				<p>Coming soon...</p>
			</Card>
		);
	} else {
		return <p>Out</p>;
	}
};
