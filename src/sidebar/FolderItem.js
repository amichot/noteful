import React from "react";
import "./FolderItem.css";

export default function FolderItem(props) {
	return (
		<li className='FolderItem' key={props.id}>
			<h3 className='FolderItem__title'>{props.name}</h3>
		</li>
	);
}
