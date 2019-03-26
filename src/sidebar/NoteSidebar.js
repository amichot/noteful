//dependencies
import React from "react";
//components
//css
import "./NoteSidebar.css";

export default function NoteSidebar(props) {
	return (
		<div className='NoteSidebar'>
			<button
				className='NoteSidebar__back-button'
				onClick={() => props.history.goBack()}>
				Back
			</button>
			{props.folder && (
				<h3 className='NoteSidebar__folder-name FolderItem'>
					{props.folder.name}
				</h3>
			)}
		</div>
	);
}
