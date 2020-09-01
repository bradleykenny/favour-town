import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { FeedCard } from "./FeedCard";

import "../style/FeedList.css";

type FeedListProps = {};

export const FeedList = (props: FeedListProps) => {
	return (
		<div id="feedList">
			<FeedCard
				title="Example Card"
				text="Some example text"
				username="bradknny"
			/>
			<FeedCard
				title="Example Card"
				text="Some example text"
				username="bradknny"
			/>
		</div>
	);
};
