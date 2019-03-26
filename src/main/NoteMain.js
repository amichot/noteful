import React from "react";
//components
import { getDate } from "../notes-helpers";
//css
import "./NoteMain.css";

export default function NoteMain(props) {
	const note = props.note[0];
	return (
		<section>
			<ul className='noteMain' aria-live='polite'>
				{note && (
					<li className='NoteItem' key={note.id}>
						<h3 className='NoteItem__title'>{note.name}</h3>
						<p className='NoteItem__date'>
							Date modified on <time>{getDate(note.modified)}</time>
						</p>
						<p>
							{" "}
							Content: <br />
							{note.content}
						</p>
					</li>
				)}
			</ul>
		</section>
	);
}
