import React from "react";
import { Card } from "react-bootstrap";

import "../style/FeedList.css";

export const Legend = (props: {}) => {
	return (
		<Card id="cardLegend">
			<Card.Text>
				<span className="legendCircle green"></span>
				Complete
			</Card.Text>
			<Card.Text>
				<span className="legendCircle yellow"></span>
				Claimed
			</Card.Text>
			<Card.Text>
				<span className="legendCircle grey"></span>
				Unclaimed
			</Card.Text>
		</Card>
	);
};
