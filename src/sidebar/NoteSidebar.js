//dependencies
import React from "react";
//components
//context
import NotefulsContext from "../NotefulsContext";
//helper functions
import { findNote, findFolder } from "../notes-helpers";
//css
import "./NoteSidebar.css";

export default class NoteSidebar extends React.Component {
	static contextType = NotefulsContext;

	static defaultProps = {
		history: {
			goBack: () => {}
		},
		match: {
			params: {}
		}
	};
	render() {
		const { notes, folders } = this.context;
		const { noteId } = this.props.match.params;
		const note = findNote(notes, noteId) || {};
		const folder = findFolder(folders, note.folderId);

		return (
			<div className='NoteSidebar'>
				<button
					className='NoteSidebar__back-button'
					onClick={() => this.props.history.goBack()}>
					Back
				</button>
				{folder && (
					<h3 className='NoteSidebar__folder-name FolderItem'>{folder.name}</h3>
				)}
			</div>
		);
	}
}
