//dependencies
import React from "react";
import { NavLink } from "react-router-dom";
//components
import FolderItem from "./FolderItem";
//context
import NotefulsContext from "../NotefulsContext";
//css
import "./MainSidebar.css";

export default class MainSidebar extends React.Component {
	static contextType = NotefulsContext;

	static defaultProps = {
		folders: []
	};
	render() {
		const folders = this.context.folders;
		return (
			<div>
				<ul className='foldersList' aria-live='polite'>
					{folders.map(folder => (
						<NavLink
							className='MainSidebar__folderLink'
							to={`/folder/${folder.id}`}>
							<FolderItem key={folder.id} {...folder} />
						</NavLink>
					))}
				</ul>
			</div>
		);
	}
}
