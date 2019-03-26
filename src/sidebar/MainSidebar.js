//dependencies
import React from "react";
import { NavLink } from "react-router-dom";
//components
import FolderItem from "./FolderItem";
//css
import "./MainSidebar.css";

export default function MainSidebar(props) {
	return (
		<div>
			<ul className='foldersList' aria-live='polite'>
				{props.folders.map(folder => (
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
