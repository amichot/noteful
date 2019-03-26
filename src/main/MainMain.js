//dependencies
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
//components
import NoteItem from "./NoteItem";
//css
import "./MainMain.css";

class MainMain extends Component {
	static defaultProps = {
		notes: []
	};

	render() {
		const notes = this.props.notes;
		return (
			<section>
				<ul className='notesList' aria-live='polite'>
					{notes.map(note => (
						<NavLink className='MainMain__noteLink' to={`/note/${note.id}`}>
							<NoteItem key={note.id} {...note} />
						</NavLink>
					))}
				</ul>
			</section>
		);
	}
}

export default MainMain;
