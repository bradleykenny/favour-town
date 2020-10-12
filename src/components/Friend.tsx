import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
	Button,
	Form,
	Container,
	Row,
	Col,
	Card,
	ListGroup,
	ListGroupItem,
	Badge,
} from "react-bootstrap";
import "../style/DirectMessage.css";

type friendProps = {
	friend: {
		name: string;
		avatar: string;
		message: string;
		when: string;
		toRespond: 0;
		seen: boolean;
		active: boolean;
	};
};
export const Friend = (props: friendProps) => (
	<ListGroupItem
		href="#!"
		className="d-flex justify-content-between p-2
        border-light"
		style={{ backgroundColor: props.friend.active ? "#eeeeee" : "" }}
	>
		<img
			className="img-circle mr-2 z-depth-1"
			src={props.friend.avatar}
			alt="avatar"
			style={{ width: "3em", height: "3rem" }}
		/>
		<div style={{ fontSize: "0.95rem" }}>
			<strong>{props.friend.name}</strong>
			<p className="text-muted">{props.friend.message}</p>
		</div>
		<div>
			<p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>
				{props.friend.when}
			</p>
			{props.friend.seen ? (
				<span className="text-muted float-right">
					<svg
						width="1em"
						height="1em"
						viewBox="0 0 16 16"
						className="bi bi-check"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
						/>
					</svg>
				</span>
			) : props.friend.toRespond ? (
				<Badge color="danger" className="float-right">
					{props.friend.toRespond}
				</Badge>
			) : (
				<span className="text-muted float-right">
					<svg
						width="1em"
						height="1em"
						viewBox="0 0 16 16"
						className="bi bi-reply-fill"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M9.079 11.9l4.568-3.281a.719.719 0 0 0 0-1.238L9.079 4.1A.716.716 0 0 0 8 4.719V6c-1.5 0-6 0-7 8 2.5-4.5 7-4 7-4v1.281c0 .56.606.898 1.079.62z" />
					</svg>
				</span>
			)}
		</div>
	</ListGroupItem>
);
