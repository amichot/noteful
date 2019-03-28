//dependencies
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
//components
import NoteItem from "./NoteItem";
//helperfunctions
import { getNotesForFolder } from "../notes-helpers";
//context
import NotefulsContext from "../NotefulsContext";
//css
import "./MainMain.css";

class MainMain extends Component {
	static contextType = NotefulsContext;

	static defaultProps = {
		match: {
			params: {}
		}
	};

	render() {
		const { folderId } = this.props.match.params;
		const { notes = [] } = this.context;
		const notesForFolder = getNotesForFolder(notes, folderId);
		return (
			<section>
				<ul className='notesList' aria-live='polite'>
					{notesForFolder.map(note => (
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
