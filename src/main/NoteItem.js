import React from "react";
import "./NoteItem.css";
import { getDate } from "../notes-helpers";

export default function NoteItem(props) {
	return (
		<li className='NoteItem' key={props.id}>
			<h3 className='NoteItem__title'>{props.name}</h3>
			<p className='.Note__dates'>
				Date modified on<time> {getDate(props.modified)}</time>
			</p>
		</li>
	);
}
