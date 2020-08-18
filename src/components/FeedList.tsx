import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { FeedCard } from "./FeedCard";

import "../style/FeedList.css";

type FeedListProps = {};
type FeedListState = {};

export class FeedList extends Component<FeedListProps, FeedListState> {
	render() {
		return (
			<div id="feedList">
				<FeedCard
					title="Example Card"
					text="Some example text"
					username="bradknny"
				/>
			</div>
		);
	}
}
